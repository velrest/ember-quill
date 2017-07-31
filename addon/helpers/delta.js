import Ember from 'ember';
import Quill from 'quill';

const Delta = Quill.import('delta');

export function delta([delta]) {
	return new Delta(delta);
}

export default Ember.Helper.helper(delta);
