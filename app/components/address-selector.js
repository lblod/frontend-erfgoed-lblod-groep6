import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { keepLatestTask, task, timeout } from 'ember-concurrency';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AdressenregisterSelectorComponent extends Component {
  @service addressRegister;

  @tracked address = null;
  @tracked addressSuggestion;
  @tracked addressesWithBusnumbers;
  @tracked addressWithBusnumber;

  constructor() {
    super(...arguments);
    this.getAddressInfo();
  }

  get isDisabledBusnumberSelect() {
    return !this.addressWithBusnumber;
  }

  async getAddressInfo() {
    const address = await this.args.address;
    if (address) {
      this.addressSuggestion = await this.addressregister.toAddressSuggestion(
        address
      );
      const addresses = await this.addressregister.findAll(
        this.addressSuggestion
      );
      if (addresses.length > 1) {
        const selectedAddress = addresses.find(
          (a) => a.busnumber == address.busnummer
        );
        this.addressesWithBusnumbers = addresses.sortBy('busnumber');
        this.addressWithBusnumber = selectedAddress;
      } else {
        this.addressesWithBusnumbers = null;
        this.addressWithBusnumber = null;
      }
    }
  }

  selectSuggestion = task( async (addressSuggestion) => {
    this.addressesWithBusnumbers = null;
    this.addressWithBusnumber = null;
    this.addressSuggestion = addressSuggestion;

    if (addressSuggestion) {
      const addresses = await this.addressRegister.findAll(addressSuggestion);
      if (addresses.length == 1) {
        this.args.onChange(addresses[0].adresProperties);
      }
    } else {
      this.args.onChange(null);
    }
  });

  search = keepLatestTask( async (searchData) => {
    try {
      await timeout(400);
      const addressSuggestions = await this.addressRegister.suggest(searchData);
      return addressSuggestions;
    } catch (e) {
      console.log(e);
    }
  });

  @action
  selectAddressWithBusnumber(address) {
    this.addressWithBusnumber = address;
    this.args.onChange(address.adresProperties);
  }
}
