import install from '../../scripts/install.mjs';

await install('test262', 'test262-harness');

await $`test262-harness -t "$(node -pe 'os.cpus().length')" --host-args='--unhandled-rejections=none' --preprocessor=./tests/test262/preprocessor.js --prelude=./packages/core-js-bundle/index.js --test262-dir=node_modules/test262 'node_modules/test262/test/built-ins/**/*.js'`;
