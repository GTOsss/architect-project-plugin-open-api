import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import { defineConfig } from 'rollup';
import { dts } from 'rollup-plugin-dts';

const plugins = [
  typescript({
    tsconfig: './tsconfig.json',
    sourceMap: true,
    module: 'esnext',
  }),
  resolve({
    preferBuiltins: true,
  }),
  commonjs(),
  json(),
];

const external = [
  ...Object.keys(require('./package.json').dependencies || {}),
  ...Object.keys(require('./package.json').peerDependencies || {}),
];

export default defineConfig([
  // publicMethods CommonJS (Node.js)
  {
    input: 'publicMethods.ts',
    output: {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    plugins: plugins,
    external: external,
  },

  // publicMethods ESM (webpack and other builders)
  {
    input: 'publicMethods.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: plugins,
    external: external,
  },

  // Generate *.d.ts files
  {
    input: 'publicMethods.ts',
    output: {
      file: 'dist-types/dist.d.ts',
      format: 'es',
    },
    plugins: [dts()],
    external: external,
  },
]);
