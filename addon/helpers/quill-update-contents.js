import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';

export default Helper.extend({

	quillable: service(),

	compute([name], { delta }) {
		return (data = delta) => {
			this.get('quillable').update(name, null, data, null, 'api');
		};
	}

});
