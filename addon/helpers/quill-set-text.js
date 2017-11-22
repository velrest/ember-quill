import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';

export default Helper.extend({

	quillable: service(),

	compute([name], { html }) {
		return (data = html) => {
			this.get('quillable').text(name, null, data, 'api');
		};
	}

});
