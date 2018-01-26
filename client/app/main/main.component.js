import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  awesomeevents = [];
  newThing = '';

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/events')
      .then(response => {
        this.awesomeevents = response.data;
      });
  }

  addThing() {
    if(this.newThing) {
      this.$http.post('/api/events', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/events/${thing._id}`);
  }
}

export default angular.module('letsgo.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
