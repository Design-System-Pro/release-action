import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as fs from "fs";

async function run(): Promise<void> {
  try {
    const token = core.getInput("github-token", { required: true });
    const distDir = core.getInput("dist-dir", { required: true });

    // Verify dist directory exists
    if (!fs.existsSync(distDir)) {
      throw new Error(`Dist directory '${distDir}' does not exist`);
    }

    // Set up environment variables
    process.env.GITHUB_TOKEN = token;

    // Install dependencies
    await exec.exec("npm", ["ci"]);

    // Run semantic-release
    await exec.exec("npx", ["semantic-release"]);

    core.info("Semantic release completed successfully");
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed("An unexpected error occurred");
    }
  }
}

run();
