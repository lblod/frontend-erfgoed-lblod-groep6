import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default class AdminIndexRoute extends Route {
  @service session;
  @service router;
  beforeModel() {
    if (this.session.isAuthenticated) {
      // todo REDIRECT TO CORRECT PAGEx
    } else {
      this.router.transitionTo('admin.login');
    }
  }
}
