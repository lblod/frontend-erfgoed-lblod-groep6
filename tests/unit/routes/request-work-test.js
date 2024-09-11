import { module, test } from 'qunit';
import { setupTest } from 'frontend-erfgoed-lblod-groep6/tests/helpers';

module('Unit | Route | request-work', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:request-work');
    assert.ok(route);
  });
});
