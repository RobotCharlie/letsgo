import angular from 'angular';
import moment from 'moment';
import _ from 'lodash';
import Helper from './event-detail-edit.helper';

export default class {

  constructor($state, $scope, uiGmapGoogleMapApi) {
    'ngInject';

    angular.extend(this, {
      $state,
      helper: new Helper(),
      errorMessages: [],
      selectedDate: moment().toDate(),
      selectedTime: moment().toDate(),
      selectedDateTime: moment().toDate(),
      datepickerPopup: { opened: false },
      timepickerPopup: { opened: false },
      isReadonly: true,
      map: { center: { latitude: 45, longitude: -73 }, zoom: 8 },
    });

    uiGmapGoogleMapApi.then(maps => {
      console.log(maps);
    });
  }

  $onInit() {
    if (this.event._id) {
      this.parseWhen(this.event.when);
    }
    this.onDateTimeChange();
  }

  saveOrUpdate(event) {
    this.onSaveOrUpdate({ $event: event }).then(() => {
      this.$state.go('event.event-list');
    }, err => {
      this.errorMessages.push(err);
    });
  }

  delete(id) {
    this.onDelete({ $event: id }).then(() => {
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

  removeParticipant(participant) {
    _.remove(this.event.participants, participant);
  }
}
