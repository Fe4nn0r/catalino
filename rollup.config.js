import babel from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import del from "rollup-plugin-delete";
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from '@rollup/plugin-replace';
import dotenv from "rollup-plugin-dotenv";
import pkg from "./package.json";

const OUT = 'build/lib.js';

export default {
  input: "lib/index.js",
  output: [
    { file: OUT, format: "iife", name: "lib" },
  ],
  plugins: [
    dotenv(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    nodeResolve(),
    external(),
    commonjs({
      include: /node_modules/,
    }),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
    del({ targets: [OUT] }),
  ],
  external: Object.keys(pkg.peerDependencies || {}),
};
