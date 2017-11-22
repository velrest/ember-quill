import Evented from '@ember/object/evented';
import Service from '@ember/service';
import Quill from 'quill';

const Delta = Quill.import('delta');

class Group {
	constructor() {
		this.areas = [];
	}
}

export default Service.extend(Evented, {

	groups: [],

	group(name) {
		return this.groups[name] = this.groups[name] || new Group();
	},

	register(name, quill) {
		if (name) this.group(name).areas.addObject(quill);
	},

	unregister(name, quill) {
		if (name) this.group(name).areas.removeObject(quill);
	},

	text(name, quill, text, source = 'api') {

		// Ensure the object is a proper Delta instance.
		let delta = new Delta().insert(text);

		// Ensure all other editors are updated with the changes.
		this.group(name).areas.reject(q => q === quill).forEach(q => {
			q.setContents(delta, 'silent');
		});

		// Trigger a 'insert' notification so others can subscribe.
		this.trigger('insert', name, quill, delta, source);

	},

	insert(name, quill, delta, source = 'api') {

		// Ensure the object is a proper Delta instance.
		delta = delta instanceof Delta ? delta : new Delta(delta);

		// Ensure all other editors are updated with the changes.
		this.group(name).areas.reject(q => q === quill).forEach(q => {
			q.setContents(delta, 'silent');
		});

		// Trigger a 'insert' notification so others can subscribe.
		this.trigger('insert', name, quill, delta, source);

	},

	update(name, quill, delta, from, source = 'api') {

		// Ensure the object is a proper Delta instance.
		delta = delta instanceof Delta ? delta : new Delta(delta);

		// Ensure all other editors are updated with the changes.
		this.group(name).areas.reject(q => q === quill).forEach(q => {
			q.updateContents(delta, 'silent');
		});

		// Trigger a 'update' notification so others can subscribe.
		this.trigger('update', name, quill, delta, from, source);

	},

	select(name, quill, delta, from, source = 'api') {

		// Ensure the object is a proper Delta instance.
		delta = delta instanceof Delta ? delta : new Delta(delta);

		// Trigger a 'select' notification so others can subscribe.
		this.trigger('select', name, quill, delta, from, source);

	},

});
