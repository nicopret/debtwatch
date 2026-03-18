import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";

const devCachePath = join(process.cwd(), ".next", "dev");

if (existsSync(devCachePath)) {
  rmSync(devCachePath, { recursive: true, force: true });
}

const child = spawn("node", ["./node_modules/next/dist/bin/next", "dev", "--webpack"], {
  cwd: process.cwd(),
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
