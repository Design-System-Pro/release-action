import { exec } from "@actions/exec";
import { transform } from "./generator/style-dictionary";
import { getReleaseBranch, getTokenPath } from "./options";

(async () => {
  // Generate releases
  await transform({
    tokensPath: getTokenPath(),
  });

  // Release
  await exec(`pnpm semantic-release --branches ${getReleaseBranch()}`);
})();
