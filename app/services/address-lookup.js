import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

const BASE_URL = 'localhost/adres-search';

export default class AddressLookupService extends Service {
  @tracked addresses = [];
  @tracked error = null;
  @tracked loading = false;

  async lookup(searchTerm) {
    try {
      this.error = null;
      this.loading = true;
      const response = await fetch(
        `adres-search/search?query="${searchTerm}"`,
        {
          method: 'GET',
        }
      );
      const data = await response.json();
      console.log(data);
      this.addresses = data.adressen;
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  }
}
