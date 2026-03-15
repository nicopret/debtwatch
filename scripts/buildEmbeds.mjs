import { cp, mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const nextBuildDir = path.join(repoRoot, ".next");
const exportDir = path.join(repoRoot, "out");
const embedExportDir = path.join(exportDir, "embed");
const embedOutputDir = path.join(repoRoot, "static", "embeds");
const sharedAssetsDir = path.join(exportDir, "_next");
const publicAssetsDir = path.join(exportDir, "assets");
const faviconPath = path.join(exportDir, "favicon.ico");
const nodeCommand = process.execPath;
const nextScript = path.join(repoRoot, "node_modules", "next", "dist", "bin", "next");

async function pathExists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

function run(command, args) {
  return new Promise((resolve, reject) => {
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

async function copyDirectoryContents(sourceDir, targetDir) {
  await mkdir(targetDir, { recursive: true });
  const entries = await readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);
    await cp(sourcePath, targetPath, { recursive: true });
  }
}

async function collectHtmlFiles(directoryPath) {
  const entries = await readdir(directoryPath, { withFileTypes: true });
  const htmlFiles = [];

  for (const entry of entries) {
    const fullPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      htmlFiles.push(...(await collectHtmlFiles(fullPath)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".html")) {
      htmlFiles.push(fullPath);
    }
  }

  return htmlFiles;
}

async function collectVersions(directoryPath) {
  const versions = new Set();
  const contextEntries = await readdir(directoryPath, { withFileTypes: true });

  for (const contextEntry of contextEntries) {
    if (!contextEntry.isDirectory() || contextEntry.name.startsWith("_")) {
      continue;
    }

    const versionEntries = await readdir(path.join(directoryPath, contextEntry.name), {
      withFileTypes: true,
    });

    for (const versionEntry of versionEntries) {
      if (versionEntry.isDirectory()) {
        versions.add(versionEntry.name);
      }
    }
  }

  return [...versions].sort();
}

async function main() {
  await rm(embedOutputDir, { recursive: true, force: true });
  await rm(exportDir, { recursive: true, force: true });
  await rm(nextBuildDir, { recursive: true, force: true });

  await run(nodeCommand, [nextScript, "build"]);

  if (!(await pathExists(embedExportDir))) {
    throw new Error("Next export did not produce an 'out/embed' directory.");
  }

  await copyDirectoryContents(embedExportDir, embedOutputDir);

  if (await pathExists(sharedAssetsDir)) {
    await cp(sharedAssetsDir, path.join(embedOutputDir, "_next"), { recursive: true });
  }

  if (await pathExists(publicAssetsDir)) {
    await cp(publicAssetsDir, path.join(embedOutputDir, "assets"), { recursive: true });
  }

  if (await pathExists(faviconPath)) {
    await cp(faviconPath, path.join(embedOutputDir, "favicon.ico"));
  }

  const htmlFiles = await collectHtmlFiles(embedOutputDir);
  const versions = await collectVersions(embedOutputDir);

  console.log(`Generated ${htmlFiles.length} embed pages`);
  console.log(`Versions: ${versions.join(", ")}`);
  console.log(`Embed output written to ${embedOutputDir}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
