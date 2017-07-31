import Ember from 'ember';

export default Ember.Helper.extend({

	quillable: Ember.inject.service(),

	compute([name], { delta }) {
		return (data = delta) => {
			this.get('quillable').insert(name, null, data, 'api');
		};
	}

});
