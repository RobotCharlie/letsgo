import angular from 'angular';

export default class {

  constructor(EventService) {
    'ngInject';

    angular.extend(this, {
      EventService,
      modelOptions: { debounce: { default: 500, blur: 250 }, getterSetter: true },
      typedText: null,
      events: []
    });
  }

  change(text) {
    if (text) {
      this.EventService.search(text).then(res => {
        this.events = res;
      });
    } else {
      this.event = [];
    }
    console.log(this.events);
  }
}
