import moment from 'moment/moment';

export default class {

  constructor() {
    'ngInject';
  }

  getDisplayDate(when) {
    return moment(when).format('LL');
  }
}
