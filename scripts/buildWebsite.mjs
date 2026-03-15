import { cp, mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const nextBuildDir = path.join(repoRoot, ".next");
const exportDir = path.join(repoRoot, "out");
const websiteDir = path.join(repoRoot, "static", "website");
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

async function main() {
  await rm(websiteDir, { recursive: true, force: true });
  await rm(exportDir, { recursive: true, force: true });
  await rm(nextBuildDir, { recursive: true, force: true });

  await run(nodeCommand, [nextScript, "build"]);

  if (!(await pathExists(exportDir))) {
    throw new Error("Next static export directory 'out' was not created.");
  }

  await mkdir(path.dirname(websiteDir), { recursive: true });
  await cp(exportDir, websiteDir, { recursive: true });

  const topLevelEntries = await readdir(websiteDir);

  console.log(`Static website written to ${websiteDir}`);
  console.log(`Top-level entries: ${topLevelEntries.join(", ")}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
