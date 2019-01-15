import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import babel from 'rollup-plugin-babel'
import pkg from './package.json';

const createConfig = output => ({
	input: {
		'react-naver-maps': 'src/index.js',
		hocs: 'src/hocs/index.js',
	},
	experimentalCodeSplitting: true,
	plugins: [
		external({ includeDependencies: true }),
		babel({
			exclude: 'node_modules/**',
			runtimeHelpers: true,
			plugins: [
				[
					'@babel/plugin-transform-runtime',
					{
						useESModules: output.format !== 'cjs'
					}
				]
			]
		}),
		resolve()
	],
	output: Object.assign({ sourcemap: true }, output),
});

export default [
  createConfig({
    dir: 'dist',
    format: 'cjs',
    entryFileNames: '[name].[format].js',
  }),
  createConfig({
    dir: 'dist',
    format: 'esm',
    entryFileNames: '[name].[format].js',
  })
]