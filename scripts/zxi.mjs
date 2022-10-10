import konan from 'konan';
import install from './install.mjs';

const [filename] = argv._;
const source = await fs.readFile(filename);

const dependencies = konan(String(source)).strings;
const external = dependencies.filter(it => !/^(?:\.|\/|node:)/.test(it));
const packages = external.map(it => it.replace(/^(@[^/@]+\/[^/@]+|[^/@]+)\/.*/, '$1'));

await install(...packages);

process.env.FORCE_COLOR = '1';

await $`zx ${ argv._ }`;
