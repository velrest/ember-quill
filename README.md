# ember-quill

An addon for working with the Quill rich text editor in an Ember.js app.

[![](https://img.shields.io/circleci/project/abcum/ember-quill/master.svg?style=flat-square)](https://circleci.com/gh/abcum/ember-quill) [![](https://img.shields.io/npm/v/@abcum/ember-quill.svg?style=flat-square)](https://www.npmjs.com/package/@abcum/ember-quill) [![](https://img.shields.io/badge/ember-2.16.1+-orange.svg?style=flat-square)](https://github.com/abcum/ember-quill) [![](https://david-dm.org/abcum/ember-quill/status.svg?style=flat-square)](https://david-dm.org/abcum/ember-quill) [![](https://david-dm.org/abcum/ember-quill/dev-status.svg?style=flat-square)](https://david-dm.org/abcum/ember-quill?type=dev) [![](https://img.shields.io/badge/license-MIT-00bfff.svg?style=flat-square)](https://github.com/abcum/ember-quill) 

## Usage

### Installation

`ember install @abcum/ember-quill`

### Introduction

The ember-quill addon adds functionality for working with Quill.js rich text editor instances, enabling efficient WYSIWYG editing, and collaboration between editor instances. Subscribe to editor events, and push changes to each editor instance using the quill service.

### Examples

Add a basic Quill editor.

```hbs
{{quill-editor placeholder='Enter some text here...'}}
```

And specify a theme using the `theme` attribute.

```hbs
{{quill-editor placeholder='Enter some text here...' theme='bubble'}}
```

And specify some initial html content for the editor.

```hbs
{{quill-editor placeholder='Enter some text here...' html=model.html}}
```

Or specify the editor's initial content with a [`Delta`](https://github.com/quilljs/delta/) object.

```hbs
{{quill-editor placeholder='Enter some text here...' delta=(delta model.content)}}
```

And perform an action when the editor content is modified.

```hbs
{{quill-editor placeholder='Enter some text here...' content-change=(action (mut model.content))}}
```

Give the instance a name so multiple instances are synchronized and events can be sent and received from each instance.

```hbs
{{quill-editor placeholder='Enter some text here...' name='editor'}}
```

Alternatively it is possible to subscribe to editor changes using the `quillable` service.

```js
import Ember from 'ember';

export default Ember.Route.extends({

	quillable: Ember.inject.service(),

	setupController(controller, model) {
		controller.set('model', model);
		// Connect to a datastore and subscribe to changes
		this.get('store').subscribe(change => {
			this.get('quillable').update('editor', null, change);
		});
	},

	activate() {
		this.get('quillable').on('update', this, this.quill);
	},

	deactivate() {
		this.get('quillable').off('update', this, this.quill);
	},

	quill(name, editor, delta, from, source) {
		// Save each change to a datastore
		this.get('store').push(delta);
	},

});
```

### Events

The following events are available on each `quill-editor` component.

Event name                                                          | Event response
:-------------------------------------------------------------------|:----------------------------------------------------
content-change                                                      | Emitted when the contents of have changed. Emits the full content as a [`Delta`](https://github.com/quilljs/delta/).
[editor-change](https://quilljs.com/docs/api/#editor-change)        | Emitted when either `text-change` or `selection-change` events are emitted.
html-change                                                         | Emitted when the contents of have changed. Emits the full `html` content of the editor.
length-change                                                       | Emitted when the contents of have changed. Emits the `length` of the editor content.
[selection-change](https://quilljs.com/docs/api/#selection-change)  | Emitted when the editor selection changes. Emits a selection [`Delta`](https://github.com/quilljs/delta/) representing the selection.
[text-change](https://quilljs.com/docs/api/#text-change)            | Emitted when the editor selection changes. Emits a [`Delta`](https://github.com/quilljs/delta/) object for each change in the editor.

### Helpers

The following helpers are available.

Helper name            | Example output                               
:----------------------|:----------------------------------------------------
delta                  | Converts an object to a [`Delta`](https://github.com/quilljs/delta/).
quill-set-contents     | Runs `quill.setContents` on a named instance.
quill-set-text         | Runs `quill.setText` on a named instance.
quill-update-contents  | Runs `quill.updateContents` on a named instance.

## Development

- `make install` (install bower and ember-cli dependencies)
- `make upgrade` (upgrade ember-cli to the specified version)
- `make tests` (run all tests defined in the package)
