import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

export default class AddressLookupService extends Service {
  @tracked addresses = [];

  lookup(searchTerm) {
    fetch(`?searchTerm=${searchTerm}`, {});
  }
}
