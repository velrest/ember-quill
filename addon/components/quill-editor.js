import { inject as service } from '@ember/service';
import Component from '@ember/component';
import Quill from 'quill';
import layout from '../templates/components/quill-editor';

const options = [
	'bounds',
	'debug',
	'formats',
	'modules',
	'placeholder',
	'readOnly',
	'theme',
];

const modules = [
	'toolbar',
	'keyboard',
	'history',
	'clipboard',
	'formula',
	'syntax',
];

export default Component.extend({

	layout,

	classNames: ['quill-editor'],

	quillable: service(),

	// ------------------------------
	// Set quill options
	// ------------------------------

	bounds: 'document.body',
	debug: 'warn',
	formats: true,
	history: {
		delay: 1000,
		maxStack: 1000,
		userOnly: true,
	},
	placeholder: '',
	readOnly: false,
	theme: 'snow',
	toolbar: [
		[{'header': [1, 2, 3, 4, false]}],
		['bold', 'italic', 'underline', 'strike'],
		[{'color': []}, {'background': []}],
		[{'align': []}, {'list': 'ordered'}, {'list': 'bullet'}],
		['blockquote', 'image', 'video', 'code-block'],
		['link'],
		['clean']
	],

	// ------------------------------
	// Set quill editor
	// ------------------------------

	didInsertElement() {

		this._super(...arguments);

		// Get the defined quill options.

		let settings = this.getProperties(options);

		settings.modules = this.getProperties(modules);

		// Instantiate the Quill editor instance.

		this.quill = new Quill(this.element, settings);

		// Set the default delta contents if specified.

		if (this.delta) this.quill.setContents(this.delta);

		// Listen to events and call any specified actions.

		this.quill.on('editor-change', (event, ...args) => {
			this.sendAction('editor-change', event, ...args);
		});

		this.quill.on('text-change', (delta, oldDelta, source) => {
			this.sendAction('text-change', delta, oldDelta, source);
		});

		this.quill.on('selection-change', (delta, oldDelta, source) => {
			this.sendAction('selection-change', delta, oldDelta, source);
		});

		// Listen to events for getting full content or length.

		this.quill.on('text-change', () => {
			this.sendAction('length-change', this.quill.getLength());
			this.sendAction('content-change', this.quill.getContents());
			this.sendAction('html-change', this.$('.ql-editor').html());
		});

		// Listen to events for syncing with the quillable service.

		this.get('quillable').register(this.name, this.quill);

		this.quill.on('text-change', (delta, oldDelta, source) => {
			this.get('quillable').update(this.name, this.quill, delta, oldDelta, source);
		});

		this.quill.on('selection-change', (delta, oldDelta, source) => {
			this.get('quillable').select(this.name, this.quill, delta, oldDelta, source);
		});

	},

	willDestroyElement() {

		this._super(...arguments);

		this.get('quillable').unregister(this.name, this.quill);

	},

});
