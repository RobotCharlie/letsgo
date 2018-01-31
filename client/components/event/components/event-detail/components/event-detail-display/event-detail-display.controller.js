import angular from 'angular';
import moment from 'moment';

export default class {

  constructor() {
    'ngInject';

    angular.extend(this, {
      displayedWhen: null
    });
  }

  $onInit() {
    this.displayedWhen = moment(this.event.when).format('LLLL');
  }
}
