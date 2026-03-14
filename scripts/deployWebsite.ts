import { createReadStream } from "node:fs";
import { readdir, stat } from "node:fs/promises";
import { join, relative } from "node:path";

import {
  HeadBucketCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const SOURCE_DIRECTORY = join(process.cwd(), "static", "website");
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

function getUtcDateFolderName(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

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
      `Static website build not found at '${directoryPath}'. Run 'npm run build:website' first.`,
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

async function ensureDestinationPrefixIsEmpty(client: S3Client, prefix: string) {
  const response = await client.send(
    new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: prefix,
      MaxKeys: 1,
    }),
  );

  if ((response.KeyCount ?? 0) > 0) {
    throw new Error(
      `Deployment path 's3://${BUCKET_NAME}/${prefix}' already exists. Refusing to overwrite an existing dated deployment.`,
    );
  }
}

async function uploadFile(client: S3Client, filePath: string, prefix: string) {
  const relativePath = relative(SOURCE_DIRECTORY, filePath).replace(/\\/g, "/");
  const key = `${prefix}${relativePath}`;

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

async function main() {
  try {
    await ensureSourceDirectoryExists(SOURCE_DIRECTORY);

    const dateFolder = getUtcDateFolderName(new Date());
    const destinationPrefix = `${dateFolder}/`;
    const destinationPath = `s3://${BUCKET_NAME}/${destinationPrefix}`;
    const files = await collectFiles(SOURCE_DIRECTORY);

    if (files.length === 0) {
      throw new Error(`No files found under '${SOURCE_DIRECTORY}'.`);
    }

    const client = new S3Client({});

    await ensureBucketExists(client);
    await ensureDestinationPrefixIsEmpty(client, destinationPrefix);

    console.log(`Uploading ${files.length} files from ${SOURCE_DIRECTORY}`);
    console.log(`Bucket: ${BUCKET_NAME}`);
    console.log(`Destination: ${destinationPath}`);

    for (const file of files) {
      const key = await uploadFile(client, file, destinationPrefix);
      console.log(`Uploaded ${key}`);
    }

    console.log("Website deployed successfully");
    console.log(`Bucket: ${BUCKET_NAME}`);
    console.log(`Path: ${destinationPath}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown deployment error";
    console.error("Failed to deploy website.");
    console.error(message);
    process.exitCode = 1;
  }
}

void main();
