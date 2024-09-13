import SessionService from 'ember-simple-auth/services/session';

import { service } from '@ember/service';

export default class LoketSessionService extends SessionService {
  @service currentSession;
  @service router;

  async handleAuthentication() {
    await this.currentSession.load();
    super.handleAuthentication('admin.dashboard');
  }

  handleInvalidation() {
    this.router.transitionTo('index');
  }
}
