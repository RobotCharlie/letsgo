import template from './cg-search-bar.html';
import controller from './cg-search-bar.controller';

export default {
  template,
  controller,
  bindings: {
    typedText: '<',
    options: '<',
    onChange: '&?',
    onSearch: '&?'
  }
};
