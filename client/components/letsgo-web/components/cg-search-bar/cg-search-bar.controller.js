import angular from 'angular';

export default class {

  constructor(EventService) {
    'ngInject';

    angular.extend(this, {
      EventService,
      modelOptions: { debounce: { default: 100, blur: 100 }, getterSetter: true },
      typedText: null,
    });
  }

  change(text) {
    this.onChange({ $event: text });
  }

  search(text) {
    this.onSearch({ $event: text });
  }
}
