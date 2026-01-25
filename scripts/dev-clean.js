#!/usr/bin/env node

/**
 * Kill Port and Start Dev Server
 * 跨平台自動清理指定 port 的舊 process 並啟動新的 dev server
 * 支援 Windows 和 macOS/Linux
 */

import { exec, spawn } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

const PORT = process.env.PORT || 3000;
const isWindows = process.platform === "win32";

console.log("\x1b[36m🔍 Checking for processes on port %d...\x1b[0m", PORT);

async function killProcessOnPort(port) {
  try {
    let command;

    if (isWindows) {
      // Windows: 使用 netstat 找到 PID
      command = `netstat -ano | findstr :${port}`;
    } else {
      // macOS/Linux: 使用 lsof
      command = `lsof -ti:${port}`;
    }

    let stdout;
    try {
      const result = await execPromise(command);
      stdout = result.stdout;
    } catch (err) {
      // 沒有找到 process 是正常的
      if (err.code === 1 || !err.stdout || err.stdout.trim() === "") {
        console.log("\x1b[32m✓ Port %d is free\x1b[0m", port);
        return;
      }
      throw err;
    }

    if (!stdout || !stdout.trim()) {
      console.log("\x1b[32m✓ Port %d is free\x1b[0m", port);
      return;
    }

    console.log("\x1b[33m⚠️  Found process(es) using port %d\x1b[0m", port);

    if (isWindows) {
      // Windows: 從 netstat 輸出解析 PID
      const lines = stdout.split("\n");
      const pids = new Set();

      lines.forEach((line) => {
        const match = line.trim().match(/LISTENING\s+(\d+)/);
        if (match) {
          pids.add(match[1]);
        }
      });

      for (const processId of pids) {
        console.log("   \x1b[31mKilling process PID: %s\x1b[0m", processId);
        try {
          await execPromise(`taskkill /F /PID ${processId}`);
          console.log("   \x1b[32m✓ Process killed\x1b[0m");
        } catch (killError) {
          console.log(
            "   \x1b[33m⚠️  Could not kill process (might already be dead)\x1b[0m"
          );
        }
      }
    } else {
      // macOS/Linux: lsof 直接返回 PID
      const pids = stdout
        .trim()
        .split("\n")
        .filter((p) => p);

      for (const processId of pids) {
        console.log("   \x1b[31mKilling process PID: %s\x1b[0m", processId);
        try {
          await execPromise(`kill -9 ${processId}`);
          console.log("   \x1b[32m✓ Process killed\x1b[0m");
        } catch (killError) {
          console.log(
            "   \x1b[33m⚠️  Could not kill process (might already be dead)\x1b[0m"
          );
        }
      }
    }

    // 等待 port 釋放
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } catch (error) {
    console.log("\x1b[33m⚠️  Note: %s\x1b[0m", error.message);
    console.log("\x1b[32m✓ Continuing anyway...\x1b[0m");
  }
}

async function startDevServer() {
  console.log("\n\x1b[36m🚀 Starting dev server...\x1b[0m\n");

  // 使用 spawn 來保持輸出流暢
  const npm = isWindows ? "npm.cmd" : "npm";
  const devProcess = spawn(npm, ["run", "dev"], {
    stdio: "inherit",
    shell: true,
  });

  devProcess.on("error", (error) => {
    console.error("\x1b[31m❌ Failed to start dev server:\x1b[0m", error);
    process.exit(1);
  });

  devProcess.on("exit", (code) => {
    if (code !== 0 && code !== null) {
      console.error("\x1b[31m❌ Dev server exited with code %d\x1b[0m", code);
      process.exit(code);
    }
  });
}

// Main execution
(async () => {
  try {
    await killProcessOnPort(PORT);
    await startDevServer();
  } catch (error) {
    console.error("\x1b[31m❌ Error:\x1b[0m", error.message);
    console.log("\x1b[33mTrying to start dev server anyway...\x1b[0m");
    await startDevServer();
  }
})();
