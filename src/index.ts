import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as fs from "fs";
import * as path from "path";

async function run(): Promise<void> {
  try {
    const distDir = core.getInput("dist-dir", { required: true }) || "./dist";

    // Verify dist directory exists
    if (!fs.existsSync(distDir)) {
      throw new Error(`Dist directory '${distDir}' does not exist`);
    }

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

      // Read the content of the action's release.config.cjs
      let releaseConfigContent = fs.readFileSync(
        actionReleaseConfigPath,
        "utf8"
      );

      // Replace the {{dist-dir}} placeholder with the actual distDir value
      releaseConfigContent = releaseConfigContent.replace(
        "{{dist-dir}}",
        distDir
      );

      // Write the modified content to the user's context
      fs.writeFileSync(userReleaseConfigPath, releaseConfigContent);

      core.info(
        `Copied and updated release.config.cjs with dist-dir: ${distDir}`
      );
    } else {
      core.info("Using existing release.config.cjs from the user's context");
    }

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
