import { transform } from './generator/style-dictionary';
import { getTokenPath } from './options';

(async () => {
  await transform({
    tokensPath: getTokenPath(),
  });
})();
