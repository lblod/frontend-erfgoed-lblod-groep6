import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default class AdminIndexRoute extends Route {
  @service session;
  @service router;
  beforeModel() {
    if (this.session.isAuthenticated) {
      this.router.transitionTo('admin.erfgoed-beheerder');
    } else {
      this.router.transitionTo('admin.login');
    }
  }
}
