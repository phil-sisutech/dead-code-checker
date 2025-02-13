import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import pkg from './package.json' assert { type: 'json' };

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const external = [
  Object.keys(pkg.dependencies || {}),
  Object.keys(pkg.peerDependencies || {})
].flat();
const globals = {
  fs: 'fs',
  path: 'path',
  colors: 'colors',
  cfonts: 'cfonts'
};

const plugins = [
  json(),
  nodeResolve({ extensions }),
  commonjs(),
  babel({
    extensions
  }),
  terser()
];

export default [
  {
    input: 'src/index.ts',
    external,
    output: [
      {
        file: pkg.module,
        format: 'esm',
        globals
      },
      {
        file: pkg.main,
        format: 'cjs',
        globals
      }
    ],
    plugins
  }
];
