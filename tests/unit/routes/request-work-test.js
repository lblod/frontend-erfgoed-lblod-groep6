import { module, test } from 'qunit';
import { setupTest } from 'frontend-erfgoed-lblod-groep6/tests/helpers';

module('Unit | Route | work-request', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:work-request');
    assert.ok(route);
  });
});
