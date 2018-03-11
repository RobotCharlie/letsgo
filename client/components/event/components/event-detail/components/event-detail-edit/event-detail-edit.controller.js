import angular from 'angular';
import moment from 'moment';
import _ from 'lodash';
import Helper from './event-detail-edit.helper';

export default class {

  constructor($state, $scope, uiGmapGoogleMapApi, uiGmapIsReady) {
    'ngInject';

    angular.extend(this, {
      $state,
      uiGmapIsReady,
      helper: new Helper(),
      errorMessages: [],
      selectedDate: moment().toDate(),
      selectedTime: moment().toDate(),
      selectedDateTime: moment().toDate(),
      datepickerPopup: { opened: false },
      timepickerPopup: { opened: false },
      isReadonly: true,
      map: { center: { latitude: 43.6, longitude: -79.3 }, zoom: 8, markers: [], control: {} },
      geocoder: null,
    });

    uiGmapGoogleMapApi.then(mapApi => {
      this.geocoder = new mapApi.Geocoder();
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

  geocode(address) {
    if (!address) {
      return;
    }
    this.geocoder.geocode({ address }, (results, status) => {
      if (status == 'OK') {
        let location = results[0].geometry.location;
        this.map.center.latitude = location.lat();
        this.map.center.longitude = location.lng();
        this.map.zoom = this.helper.getGoogleMapDefaultParams().zoom;
        this.map.marker = {
          coords: {
            latitude: this.map.center.latitude,
            longitude: this.map.center.longitude
          }
        };
        this.uiGmapIsReady.promise()
          .then(() => {
            this.map.markers.push({ idKey: 1, coords: {latitude: this.map.center.latitude, longitude: this.map.center.longitude}});
            this.map.control.refresh({latitude: this.map.center.latitude, longitude: this.map.center.longitude});
          });
      } else {
        this.errorMessages.push('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}
