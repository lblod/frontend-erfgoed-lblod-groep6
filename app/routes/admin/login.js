import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AdminLoginRoute extends Route {
  @service session;
  @service store;

  beforeModel() {
    this.session.prohibitAuthentication('index');
  }

  model() {
    const filter = { provider: 'https://github.com/lblod/mock-login-service' };
    return this.store.query('account', {
      include: 'user.admin-unit',
      filter: filter,
      page: { size: 10 },
      sort: 'user.last-name',
    });
  }
}
