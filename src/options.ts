import * as core from '@actions/core';

/**
 * Tokens path is required and it should point to the location of the tokens.json files
 * @returns string
 */
export const getTokenPath = (): string => {
  const tokensPath: string = core.getInput('tokens_path', { required: true });

  return tokensPath;
};
