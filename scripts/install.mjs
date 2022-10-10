import satisfies from 'semver/functions/satisfies.js';
import validRange from 'semver/ranges/valid.js';

const { pathExistsSync, readJsonSync } = fs;
const { dependencies, devDependencies, lazyDependencies } = readJsonSync('package.json');
const versions = { ...dependencies, ...devDependencies, ...lazyDependencies };

export default async function install(...list) {
  const pairs = list.map(name => [name, versions[name] ?? 'latest']);
  const missed = pairs.filter(([name, range]) => !pathExistsSync(`node_modules/${ name }`)
    || validRange(range) && !satisfies(readJsonSync(`node_modules/${ name }/package.json`).version, range));
  if (!missed.length) return false;
  const packages = missed.map(([name, range]) => `${ name }@${ range }`);
  await $`npm install --no-save ${ packages }`;
  return true;
}
