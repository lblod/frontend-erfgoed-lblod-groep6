import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { keepLatestTask, task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import workRequestFormSchema from '../domain/work-requests/work-request-form-schema';

export default class WorkRequestFormComponent extends Component {
  @service store;
  @tracked values = {
    firstName: '',
    lastName: '',
  };
  @tracked errors = {};
  @tracked searchObjects;
  @tracked protectedObject;
  @tracked address;
  @tracked obj;

  searchObjects = keepLatestTask( async (query) => {
    try {
      await timeout(200);
      const objects = await this.store.query('designation-object', {
        filter: {
          'admin-unit-name': this.address.gemeentenaam,
          'full-address': this.address.straatnaam,
        },
        sort: 'name'
      });
      return objects;
    } catch (e) {
      console.log(e);
    }
  });

  @action
  selectObject(obj) {
    this.protectedObject = obj;
  }

  @action
  changeFirstName(event) {
    this.values.firstName = event.target.value;
  }
  @action
  changeLastName(event) {
    this.values.lastName = event.target.value;
  }

  @action
  setAddress(address) {
    console.log(address);
    this.address = address;
    this.objectOptions = this.searchObjects.perform();
  }

  @action
  submitForm(event) {
    event.preventDefault();

    const { error, data } = workRequestFormSchema.safeParse({
      firstName: this.values.firstName,
      lastName: this.values.lastName,
    });

    if (error) {
      this.errors = error.formErrors.fieldErrors;
      return;
    }

    this.errors = {};

    console.log('Submitting form');
    console.log('First name', data.firstName);
    console.log('Last name', data.lastName);
  }
}
