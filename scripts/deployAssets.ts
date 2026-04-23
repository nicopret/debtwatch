import { createReadStream } from "node:fs";
import { readdir, stat } from "node:fs/promises";
import { join, relative } from "node:path";

import {
  HeadObjectCommand,
  HeadBucketCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import {
  ASSET_S3_PREFIX,
  buildS3ObjectKey,
  ensureRequiredFilesExist,
  getExpectedAssetFiles,
} from "./lib/exportPublishing.js";
import { getAssetExportManifest } from "../src/lib/publishedVisualVersion.js";

const SOURCE_DIRECTORY = join(process.cwd(), "static", "assets");
const BUCKET_NAME = "debt-watch-website";

const CONTENT_TYPES: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
};

function getFileExtension(filePath: string): string {
  const lastDotIndex = filePath.lastIndexOf(".");
  return lastDotIndex === -1 ? "" : filePath.slice(lastDotIndex).toLowerCase();
}

function getContentType(filePath: string): string {
  return CONTENT_TYPES[getFileExtension(filePath)] ?? "application/octet-stream";
}

async function ensureSourceDirectoryExists(directoryPath: string) {
  let stats;

  try {
    stats = await stat(directoryPath);
  } catch {
    throw new Error(
      `Static asset build not found at '${directoryPath}'. Run 'npm run build:assets' first.`,
    );
  }

  if (!stats.isDirectory()) {
    throw new Error(`Expected '${directoryPath}' to be a directory.`);
  }
}

async function collectFiles(directoryPath: string): Promise<string[]> {
  const entries = await readdir(directoryPath, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) {
      continue;
    }

    const fullPath = join(directoryPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath)));
      continue;
    }

    if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

async function ensureBucketExists(client: S3Client) {
  try {
    await client.send(new HeadBucketCommand({ Bucket: BUCKET_NAME }));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown S3 error";
    throw new Error(`Unable to access S3 bucket '${BUCKET_NAME}'. ${message}`);
  }
}

async function uploadFile(client: S3Client, filePath: string) {
  const relativePath = relative(SOURCE_DIRECTORY, filePath).replace(/\\/g, "/");
  const key = buildS3ObjectKey(ASSET_S3_PREFIX, relativePath);

  await client.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: createReadStream(filePath),
      ContentType: getContentType(filePath),
    }),
  );

  return key;
}

async function verifyUploadedObject(client: S3Client, key: string) {
  await client.send(
    new HeadObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    }),
  );
}

async function main() {
  try {
    await ensureSourceDirectoryExists(SOURCE_DIRECTORY);
    const assetManifest = getAssetExportManifest();
    await ensureRequiredFilesExist(
      SOURCE_DIRECTORY,
      assetManifest.requiredFiles.length > 0 ? assetManifest.requiredFiles : getExpectedAssetFiles(),
      "Asset deploy",
    );

    const files = await collectFiles(SOURCE_DIRECTORY);
    if (files.length === 0) {
      throw new Error(`No files found under '${SOURCE_DIRECTORY}'.`);
    }

    const client = new S3Client({});
    await ensureBucketExists(client);

    console.log(`Uploading ${files.length} asset files from ${SOURCE_DIRECTORY}`);
    console.log(`Bucket: ${BUCKET_NAME}`);
    console.log(
      `Target prefix: s3://${BUCKET_NAME}/${ASSET_S3_PREFIX || "(bucket root)"}`,
    );
    console.log("Existing objects under matching keys will be overwritten.");

    for (const file of files) {
      const key = await uploadFile(client, file);
      await verifyUploadedObject(client, key);
      console.log(`Uploaded ${key}`);
    }

    for (const relativePath of assetManifest.generatedFiles) {
      await verifyUploadedObject(client, buildS3ObjectKey(ASSET_S3_PREFIX, relativePath));
    }

    console.log("Asset deployment completed successfully");
    console.log(`Bucket: ${BUCKET_NAME}`);
    console.log(`Path: s3://${BUCKET_NAME}/${ASSET_S3_PREFIX || ""}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown deployment error";
    console.error("Failed to deploy assets.");
    console.error(message);
    process.exitCode = 1;
  }
}

void main();
