import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as fs from "fs";
import * as path from "path";

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

    // Check if release.config.cjs exists in the user's context
    const userReleaseConfigPath = path.join(
      process.cwd(),
      "release.config.cjs"
    );
    if (!fs.existsSync(userReleaseConfigPath)) {
      // If it doesn't exist, copy the one from the action's context
      const actionReleaseConfigPath = path.join(
        __dirname,
        "release.config.cjs"
      );
      fs.copyFileSync(actionReleaseConfigPath, userReleaseConfigPath);
      core.info("Copied release.config.cjs to the user's context");
    } else {
      core.info("Using existing release.config.cjs from the user's context");
    }

    // Update release.config.cjs with the correct dist-dir
    const releaseConfig = require(userReleaseConfigPath);
    const gitPlugin = releaseConfig.plugins.find(
      (plugin: unknown) =>
        Array.isArray(plugin) && plugin[0] === "@semantic-release/git"
    );
    if (gitPlugin) {
      gitPlugin[1].assets = [`${distDir}/**`];
    }
    fs.writeFileSync(
      userReleaseConfigPath,
      `module.exports = ${JSON.stringify(releaseConfig, null, 2)};`
    );
    core.info(`Updated release.config.cjs with dist-dir: ${distDir}`);

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
