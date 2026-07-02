import { existsSync, renameSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const apiDir = join(rootDir, 'src/app/api');
const backupApiDir = join(rootDir, '.next-github-pages-api-backup');

if (existsSync(backupApiDir)) {
  throw new Error(`Refusing to overwrite existing backup directory: ${backupApiDir}`);
}

let movedApiRoutes = false;
let exitCode = 1;

try {
  if (existsSync(apiDir)) {
    renameSync(apiDir, backupApiDir);
    movedApiRoutes = true;
  }

  const result = spawnSync(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['--no-install', 'next', 'build'],
    {
      cwd: rootDir,
      stdio: 'inherit',
      env: {
        ...process.env,
        GITHUB_PAGES: 'true',
        NEXT_PUBLIC_BASE_PATH: '',
        NEXT_PUBLIC_STATIC_EXPORT: 'true',
      },
    }
  );

  if (result.error) {
    throw result.error;
  }

  exitCode = result.status ?? 1;
} finally {
  if (movedApiRoutes) {
    renameSync(backupApiDir, apiDir);
  }
}

process.exitCode = exitCode;
