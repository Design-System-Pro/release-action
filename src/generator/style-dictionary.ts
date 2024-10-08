import StyleDictionary from 'style-dictionary';
import { hiddenFromPublishingFilter, releaseFilter } from './filters';
import { recursiveFilter } from './filters/utils';
import { ReleaseType } from './args';
import { PlatformConfig } from 'style-dictionary/types';

interface TransformOptions {
  tokensPath: string;
}

export async function transform({ tokensPath }: TransformOptions) {
  const releases: ReleaseType[] = ['alpha', 'beta', 'stable'];
  const styleDictionary = new StyleDictionary(
    {
      source: [`../../${tokensPath}/**/*.json`],
      platforms: {
        ...releases.reduce<Record<string, PlatformConfig>>(
          (platforms, release) => ({
            ...platforms,
            [`css-${release}`]: {
              transformGroup: 'css',
              buildPath: `../../packages/${release}/css/`,
              files: [
                {
                  destination: '_variables.css',
                  format: 'css/variables',
                  filter: (token, options) =>
                    recursiveFilter(token, options, [
                      hiddenFromPublishingFilter,
                      releaseFilter(release),
                    ]),
                },
              ],
            },
          }),
          {}
        ),
      },
    },
    {
      verbosity: 'verbose',
    }
  );

  await styleDictionary.hasInitialized;

  await styleDictionary.cleanAllPlatforms();
  await styleDictionary.buildAllPlatforms();
}
