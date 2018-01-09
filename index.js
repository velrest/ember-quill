/* eslint-env node */
'use strict';

module.exports = {
	name: '@abcum/ember-quill',
	included(app) {
		this._super.included(app);
		app.import('node_modules/quill/dist/quill.js');
		app.import('node_modules/quill/dist/quill.snow.css');
		app.import('node_modules/quill/dist/quill.bubble.css');
		app.import('vendor/quill.js', {
			exports: {
				Quill: ['default']
			}
		});
	},
};
