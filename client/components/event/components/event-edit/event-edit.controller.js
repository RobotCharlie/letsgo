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
      eventOwner: { name: 'Charles Gao' },
      errorMessages: []
    });
  }

  $onInit() {
    this.helper.getEvent(this.$state.params.id).then(event => {
      this.event = event;
    });
  }

  onSaveOrUpdate(edit) {
    console.log(edit);
    if (this.$state.params.id) {
      this.EventService.update(edit).then(() => {
        this.$state.go('event.event-list');
      }, (err) => {
        this.errorMessages.push(err);
      });
    } else {
      this.EventService.save(edit).then(() => {
        this.$state.go('event.event-list');
      }, (err) => {
        this.errorMessages.push(err);
      });
    }
  }
}
