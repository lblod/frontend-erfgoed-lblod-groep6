import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import { task } from 'ember-concurrency';

export default class AddressRegisterSelectorComponent extends Component {
  powerselectApi;

  @tracked addressSuggestion = {};
  @tracked options = [];

  constructor() {
    super(...arguments);
  }

  search = task(() => {});

  selectSuggestion = task(() => {});

  @action
  powerselectApiRegistration(api) {
    this.powerselectApi = api;
  }

  @action
  searchForCurrentAddress() {
    if (this.powerselectApi && this.addressSuggestion.fullAddress) {
      this.powerselectApi.actions.search(this.addressSuggestion.fullAddress);
    }
  }
}
