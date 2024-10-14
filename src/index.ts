import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as fs from "fs";
import * as path from "path";

async function run(): Promise<void> {
  try {
    const distDir = core.getInput("dist-dir", { required: true }) || "./dist";
    const dryRun = core.getInput("dry-run", { required: false }) === "true";

    // Verify dist directory exists
    if (!fs.existsSync(distDir)) {
      throw new Error(`Dist directory '${distDir}' does not exist`);
    }

    // Check if release.config.cjs exists in the user's context
    const userReleaseConfigPath = path.join(
      process.cwd(),
      "release.config.cjs".toString() // toString() is a hack to prevent github action's release config file from being copied to dist folder
    );
    if (!fs.existsSync(userReleaseConfigPath)) {
      // If it doesn't exist, copy the one from the action's context
      const actionReleaseConfigPath = path.join(
        process.cwd(),
        "/src/template.release.config.cjs"
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
      fs.writeFileSync(
        userReleaseConfigPath.replace("template.", ""), // Remove the "template." prefix
        releaseConfigContent
      );

      core.info(
        `Copied and updated release.config.cjs with dist-dir: ${distDir}`
      );
    } else {
      core.info("Using existing release.config.cjs from the user's context");
    }

    const releaseOptions = dryRun ? ["--dry-run"] : [];

    // Run semantic-release
    await exec.exec("npx", ["semantic-release", ...releaseOptions]);

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
