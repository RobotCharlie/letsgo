import angular from 'angular';
import moment from 'moment';
import Helper from './event-edit.helper';

export default class {

  constructor($q, $state, Auth, EventService) {
    'ngInject';

    angular.extend(this, {
      $state,
      Auth,
      EventService,
      helper: new Helper($q, EventService),
      event,
      errorMessages: [],
      selectedDate: moment().toDate(),
      selectedTime: moment().toDate(),
      selectedDateTime: moment().toDate(),
      datepickerPopup: { opened: false },
      timepickerPopup: { opened: false },
      isNew: $state.params.id
    });
  }

  $onInit() {
    this.helper.getEvent(this.isNew).then(event => {
      this.event = event;
      if (this.isNew) {
        this.parseWhen(this.event.when);
        this.onDateTimeChange();
        this.event.host = this.Auth.getCurrentUserSync();
      }
    });
  }

  onSaveOrUpdate(edit) {
    if (this.isNew) {
      this.EventService.update(edit).then(() => {
        this.$state.go('event.event-list');
      }, err => {
        this.errorMessages.push(err);
      });
    } else {
      this.EventService.save(edit).then(() => {
        this.$state.go('event.event-list');
      }, err => {
        this.errorMessages.push(err);
      });
    }
  }

  onDelete(id) {
    this.EventService.delete(id).then(() => {
      this.$state.go('event.event-list', { reload: true });
    }, err => {
      this.errorMessages.push(err);
    });
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
