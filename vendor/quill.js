(function() {
  /* globals define, quill */

  function generateModule(name, values) {
    define(name, [], function() {
      'use strict';
      return values;
    });
  }

  generateModule('quill', {
    'default': typeof Quill === 'undefined' ? null : Quill
  });

})();
