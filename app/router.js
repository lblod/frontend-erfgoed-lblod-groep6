import EmberRouter from '@ember/routing/router';
import config from 'frontend-erfgoed-lblod-groep6/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('work-request');
  this.route('cases', function () {
    this.route('overview');
  });
  this.route('admin', function () {
    this.route('login');
  });
  this.route('legaal', function () {
    this.route('cookieverklaring');
    this.route('disclaimer');
    this.route('toegankelijkheidsverklaring');
  });
  this.route('sparql');
});
