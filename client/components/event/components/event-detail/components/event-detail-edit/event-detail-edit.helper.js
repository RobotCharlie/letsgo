import moment from 'moment/moment';

export default class {

  constructor() {
    'ngInject';
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
