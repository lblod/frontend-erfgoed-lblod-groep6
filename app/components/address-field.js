import Component from '@glimmer/component';
import { service } from '@ember/service';
import { restartableTask, timeout } from 'ember-concurrency';

export default class AddressFieldComponent extends Component {
  @service('address-lookup') addressLookup;

  constructor() {
    super(...arguments);
  }

  @restartableTask()
  *changeSearchTerm(event) {
    yield timeout(300);
    this.addressLookup.lookup(event.target.value);
  }
}
