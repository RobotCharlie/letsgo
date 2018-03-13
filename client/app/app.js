'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import 'angular-validation-match';

import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import ngIdle from 'ng-idle';
import Components from '../components/components.module';
import Services from '../services/services.module';
import qrcode from 'qrcode-generator';
import ngQrcode from 'angular-qrcode';
// hacks for the browser
// if using webpack there is a better solution below
window.qrcode = qrcode;
require('../../node_modules/qrcode-generator/qrcode_UTF8');

import './app.scss';

angular.module('letsgo', [
  ngCookies,
  ngResource,
  ngSanitize,
  ngIdle,
  uiRouter,
  uiBootstrap,
  _Auth,
  account,
  admin,
  'validation.match',
  'uiGmapgoogle-maps',
  'nemLogging',
  'monospaced.qrcode',
  ngQrcode,
  navbar,
  footer,
  main,
  constants,
  util,
  Components,
  Services
])
  .config(routeConfig)
  .config(function(uiGmapGoogleMapApiProvider) {
    'ngInject';

    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyBh2WK9m1jSVp2ISycn5G98tiFKwF7s_nY',
      v: '3.29', //defaults to latest 3.X anyhow
      libraries: 'weather,geometry,visualization'
    });
  })
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['letsgo'], {
      strictDi: true
    });
  });
