import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class Application extends Route {
  @service session;
  @service currentSession;

  async beforeModel() {
    await this.session.setup();
    await this.currentSession.load();
  }
}
