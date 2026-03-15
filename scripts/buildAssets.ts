import { createReadStream, existsSync } from "node:fs";
import { mkdir, rm, stat, writeFile } from "node:fs/promises";
import { createServer, type Server } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

import { assetRegistry } from "../src/data/assets/assetRegistry";
import { getSupportedEmbedVersions } from "../src/lib/versioning";
import { buildAssetSvg } from "./lib/buildAssetSvg";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const nextBuildDir = path.join(repoRoot, ".next");
const exportDir = path.join(repoRoot, "out");
const assetOutputDir = path.join(repoRoot, "static", "assets");
const nextScript = path.join(repoRoot, "node_modules", "next", "dist", "bin", "next");
const imageWidth = 1400;
const imageHeight = 760;

const CONTENT_TYPES: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
};

function getContentType(filePath: string): string {
  const extension = path.extname(filePath).toLowerCase();
  return CONTENT_TYPES[extension] ?? "application/octet-stream";
}

function run(command: string, args: string[]) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: repoRoot,
      stdio: "inherit",
      shell: false,
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} ${args.join(" ")} failed with exit code ${code}`));
    });
  });
}

function findBrowserExecutable(): string {
  const candidates = [
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  ];

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error(
    "No supported Chromium browser found. Install Microsoft Edge or Google Chrome to build assets.",
  );
}

async function ensurePathExists(targetPath: string, description: string) {
  try {
    await stat(targetPath);
  } catch {
    throw new Error(`${description} not found at '${targetPath}'.`);
  }
}

function normalizeRequestPath(urlPath: string): string {
  const cleanPath = urlPath.split("?")[0];
  const decodedPath = decodeURIComponent(cleanPath);
  const relativePath = decodedPath === "/" ? "/index.html" : decodedPath;
  const normalizedPath = path
    .normalize(relativePath)
    .replace(/^[/\\]+/, "")
    .replace(/^(\.\.[/\\])+/, "");

  return normalizedPath;
}

async function startStaticServer(rootDirectory: string): Promise<{ server: Server; origin: string }> {
  const server = createServer(async (request, response) => {
    const requestPath = normalizeRequestPath(request.url ?? "/");
    const candidatePath = path.join(rootDirectory, requestPath);
    let filePath = candidatePath;

    try {
      const entryStats = await stat(candidatePath);
      if (entryStats.isDirectory()) {
        filePath = path.join(candidatePath, "index.html");
      }
    } catch {
      filePath = candidatePath;
    }

    if (!filePath.startsWith(rootDirectory)) {
      response.statusCode = 403;
      response.end("Forbidden");
      return;
    }

    try {
      const fileStats = await stat(filePath);
      if (!fileStats.isFile()) {
        response.statusCode = 404;
        response.end("Not found");
        return;
      }

      response.setHeader("Content-Type", getContentType(filePath));
      createReadStream(filePath).pipe(response);
    } catch {
      response.statusCode = 404;
      response.end("Not found");
    }
  });

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => resolve());
  });

  const address = server.address();
  if (!address || typeof address === "string") {
    server.close();
    throw new Error("Unable to determine local preview server address.");
  }

  return {
    server,
    origin: `http://127.0.0.1:${address.port}`,
  };
}

function screenshotPage(browserPath: string, url: string, outputPath: string) {
  return new Promise<void>((resolve, reject) => {
    const args = [
      "--headless",
      "--disable-gpu",
      "--hide-scrollbars",
      "--run-all-compositor-stages-before-draw",
      "--virtual-time-budget=5000",
      `--window-size=${imageWidth},${imageHeight}`,
      `--screenshot=${outputPath}`,
      url,
    ];

    const child = spawn(browserPath, args, {
      cwd: repoRoot,
      stdio: "ignore",
      shell: false,
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`Screenshot failed for ${url} with exit code ${code}`));
    });
  });
}

async function main() {
  await rm(assetOutputDir, { recursive: true, force: true });
  await rm(exportDir, { recursive: true, force: true });
  await rm(nextBuildDir, { recursive: true, force: true });

  await run(process.execPath, [nextScript, "build"]);
  await ensurePathExists(
    path.join(exportDir, "asset-preview"),
    "Asset preview export directory",
  );

  const browserPath = findBrowserExecutable();
  const versions = getSupportedEmbedVersions();
  const { server, origin } = await startStaticServer(exportDir);

  try {
    let pngCount = 0;
    let svgCount = 0;

    for (const asset of assetRegistry) {
      for (const version of versions) {
        const outputDirectory = path.join(assetOutputDir, asset.contextSlug, version);
        const pngOutputPath = path.join(outputDirectory, `${asset.assetSlug}.png`);
        const svgOutputPath = path.join(outputDirectory, `${asset.assetSlug}.svg`);
        const assetUrl =
          `${origin}/asset-preview/${asset.contextSlug}/${version}/${asset.assetSlug}/index.html`;

        await mkdir(outputDirectory, { recursive: true });
        await screenshotPage(browserPath, assetUrl, pngOutputPath);
        await writeFile(svgOutputPath, await buildAssetSvg(repoRoot, asset, version), "utf8");
        pngCount += 1;
        svgCount += 1;
      }
    }

    console.log(`Generated ${pngCount} PNG assets`);
    console.log(`Generated ${svgCount} SVG assets`);
    console.log(`Versions: ${versions.join(", ")}`);
    console.log(`Asset output written to ${assetOutputDir}`);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
