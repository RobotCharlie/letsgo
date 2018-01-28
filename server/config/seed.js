/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Event from '../api/event/event.model';
import User from '../api/user/user.model';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    Event.find({}).remove()
      .then(() => {
        let event = Event.create({
          name: 'Development Tools',
          what: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
                + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
                + 'Stylus, Sass, and Less.',
          when: '2018/01/02',
          where: '1371 Boulder Creek Cres Mississauga, ON'
        }, {
          name: 'Server and Client integration',
          what: 'Built with a powerful and fun stack: MongoDB, Express, '
                + 'AngularJS, and Node.',
          when: '2018/01/02',
          where: '1371 Boulder Creek Cres Mississauga, ON'
        }, {
          name: 'Smart Build System',
          what: 'Build system ignores `spec` files, allowing you to keep '
                + 'tests alongside code. Automatic injection of scripts and '
                + 'styles into your app.html',
          when: '2018/01/02',
          where: '1371 Boulder Creek Cres Mississauga, ON'
        }, {
          name: 'Modular Structure',
          what: 'Best practice client and server structures allow for more '
                + 'code reusability and maximum scalability',
          when: '2018/01/02',
          where: '1371 Boulder Creek Cres Mississauga, ON'
        }, {
          name: 'Optimized Build',
          what: 'Build process packs up your templates as a single JavaScript '
                + 'payload, minifies your scripts/css/images, and rewrites asset '
                + 'names for caching.',
          when: '2018/01/02',
          where: '1371 Boulder Creek Cres Mississauga, ON'
        }, {
          name: 'Deployment Ready',
          what: 'Easily deploy your app to Heroku or Openshift with the heroku '
                + 'and openshift subgenerators',
          when: '2018/01/02',
          where: '1371 Boulder Creek Cres Mississauga, ON'
        });
        return event;
      })
      .then(() => console.log('finished populating events'))
      .catch(err => console.log('error populating events', err));

    User.find({}).remove()
      .then(() => {
        User.create({
          provider: 'local',
          name: 'Test User',
          email: 'test@example.com',
          password: 'test'
        }, {
          provider: 'local',
          role: 'admin',
          name: 'Admin',
          email: 'admin@example.com',
          password: 'admin'
        })
        .then(() => console.log('finished populating users'))
        .catch(err => console.log('error populating users', err));
      });
  }
}
