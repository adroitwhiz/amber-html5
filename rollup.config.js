export default {
	input: 'src/index.js',
	output: {
		file: 'bundle.js',
		format: 'iife',
		globals: {
			'pixi.js': 'PIXI'
		}
	},
	external: ['pixi.js']
};
