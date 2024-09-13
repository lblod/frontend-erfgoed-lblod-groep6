import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AdminDashboardRoute extends Route {
  @service session;
  @service currentSession;
  @service store;

  async beforeModel() {
    this.session.requireAuthentication('admin.login');
  }
  async model() {
    this.store.query('case', {
      'filter[admin-unit][:id:]': this.currentSession.group.id,
      include: 'started-by,primary-subject',
    });
  }
}
