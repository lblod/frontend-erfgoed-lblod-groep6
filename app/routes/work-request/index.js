import Route from '@ember/routing/route';

export default class WorkRequestRoute extends Route {
  constructor() {
    super(...arguments);
  }

  model(params) {
    console.log('PARAMS', params);
    return {};
  }
}
