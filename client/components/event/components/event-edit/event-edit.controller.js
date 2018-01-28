import angular from 'angular';
import Helper from './event-edit.helper';

export default class {

  constructor($q, $state, EventService) {
    'ngInject';

    angular.extend(this, {
      $state,
      EventService,
      helper: new Helper($q, EventService),
      event,
      eventOwner: { name: 'Charles Gao', profilePicNum: Math.floor(Math.random() * 12 + 1) },
      errorMessages: [],
    });
  }

  $onInit() {
    this.helper.getEvent(this.$state.params.id).then(event => {
      this.event = event;
    });
  }

  onSaveOrUpdate(edit) {
    if (this.$state.params.id) {
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
}
