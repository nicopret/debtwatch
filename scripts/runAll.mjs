import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const taskGroups = {
  update: [
    "update:debt",
    "update:interest",
    "update:gdp",
    "update:gilt-yield",
    "update:lending",
    "update:budget-breakdown",
    "update:other-breakdowns",
    "update:borrowing-timeline",
    "update:debt-gdp",
    "update:debt-interest-timeline",
    "update:debt-interest-pay",
    "update:g7-yield-comparison",
    "update:g7-yield-rate-timeline",
    "update:gilt-yield-peer-timeline",
    "update:debt-sustainability",
    "update:debt-ownership",
    "update:government-spending-top-categories",
    "update:nhs-spending-breakdown",
    "update:structural-debt-flow",
    "update:inflation-linked-exposure",
  ],
  build: [
    "build:assets",
    "build:embeds",
    "build:website",
  ],
  deploy: [
    "deploy:assets",
    "deploy:embeds",
    "deploy:website",
  ],
};

function runScript(scriptName) {
  return new Promise((resolve, reject) => {
    const command = process.platform === "win32" ? "cmd.exe" : "npm";
    const args =
      process.platform === "win32"
        ? ["/d", "/s", "/c", "npm.cmd", "run", scriptName]
        : ["run", scriptName];

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

      reject(new Error(`npm run ${scriptName} failed with exit code ${code}`));
    });
  });
}

async function main() {
  const mode = process.argv[2];

  if (!mode || !(mode in taskGroups)) {
    console.error("Usage: node scripts/runAll.mjs <update|build|deploy>");
    process.exitCode = 1;
    return;
  }

  const tasks = taskGroups[mode];

  for (const task of tasks) {
    console.log(`\n==> Running ${task}`);
    await runScript(task);
  }

  console.log(`\nCompleted ${mode}:all`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
