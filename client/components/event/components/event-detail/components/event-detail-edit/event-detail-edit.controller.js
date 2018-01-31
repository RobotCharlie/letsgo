import angular from 'angular';
import moment from 'moment';
import Helper from './event-detail-edit.helper';

export default class {

  constructor() {
    'ngInject';

    angular.extend(this, {
      helper: new Helper(),
      selectedDate: moment().toDate(),
      selectedTime: moment().toDate(),
      selectedDateTime: moment().toDate(),
      datepickerPopup: { opened: false },
      timepickerPopup: { opened: false },
      isReadonly: true
    });
  }

  $onInit() {
    if (this.event._id) {
      this.parseWhen(this.event.when);
    }
    this.onDateTimeChange();
  }

  saveOrUpdate(event) {
    this.onSaveOrUpdate({ $event: event });
  }

  delete(id) {
    this.onDelete({ $event: id });
  }

  parseWhen(when) {
    this.selectedDateTime = moment(when).toDate();
    this.selectedDate = moment(when).toDate();
    this.selectedTime = moment(when).toDate();
  }

  openDatePopup() {
    this.datepickerPopup.opened = true;
  }

  openTimePopup() {
    this.timepickerPopup.opened = true;
  }

  onDateTimeChange() {
    this.selectedDateTime = this.helper.onDateTimeChange(this.selectedDate, this.selectedTime);
    this.event.when = this.selectedDateTime;
  }
}
