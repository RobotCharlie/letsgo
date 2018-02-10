import template from './search-bar.html';
import controller from './search-bar.controller';

export default {
  template,
  controller,
  bindings: {
    options: '<',
    onChange: '&?',
    onSearch: '&?'
  }
};
