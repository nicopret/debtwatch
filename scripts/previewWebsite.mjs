import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const websiteDir = path.join(repoRoot, "static", "website");
const port = Number(process.env.PORT ?? "4173");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

async function resolveFilePath(requestPath) {
  const normalized = decodeURIComponent(requestPath.split("?")[0]);
  const safePath = normalized === "/" ? "/index.html" : normalized;
  const absolutePath = path.join(websiteDir, safePath);

  try {
    const stats = await stat(absolutePath);
    if (stats.isDirectory()) {
      return path.join(absolutePath, "index.html");
    }
    return absolutePath;
  } catch {
    if (!path.extname(absolutePath)) {
      return path.join(absolutePath, "index.html");
    }
    return absolutePath;
  }
}

async function main() {
  await access(websiteDir);

  const server = http.createServer(async (request, response) => {
    const filePath = await resolveFilePath(request.url ?? "/");

    try {
      const extension = path.extname(filePath).toLowerCase();
      response.writeHead(200, {
        "Content-Type": contentTypes[extension] ?? "application/octet-stream",
      });
      createReadStream(filePath).pipe(response);
    } catch {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
    }
  });

  server.listen(port, () => {
    console.log(`Previewing static/website at http://localhost:${port}`);
  });
}

main().catch(() => {
  console.error("static/website does not exist. Run 'npm run build:website' first.");
  process.exitCode = 1;
});

