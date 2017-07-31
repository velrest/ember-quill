import Ember from 'ember';

export default Ember.Helper.extend({

	quillable: Ember.inject.service(),

	compute([name], { html }) {
		return (data = html) => {
			this.get('quillable').text(name, null, data, 'api');
		};
	}

});
