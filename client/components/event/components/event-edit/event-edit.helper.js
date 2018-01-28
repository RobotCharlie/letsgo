import angular from 'angular';
import moment from 'moment/moment';

export default class {

  constructor($q, EventService) {
    'ngInject';

    angular.extend(this, {
      $q,
      EventService
    });
  }

  getEvent(id) {
    if (id) {
      return this.EventService.get(id);
    } else {
      return this.$q.when({});
    }
  }

  onDateTimeChange(selectedDate, selectedTime) {
    let momentDateTime = moment();
    momentDateTime.set('year', selectedDate.getFullYear());
    momentDateTime.set('month', selectedDate.getMonth());
    momentDateTime.set('date', selectedDate.getDate());
    momentDateTime.set('hour', selectedTime.getHours());
    momentDateTime.set('minute', selectedTime.getMinutes());
    return momentDateTime.toDate();
  }
}
