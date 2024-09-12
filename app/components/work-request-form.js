import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import workRequestFormSchema from '../domain/work-requests/work-request-form-schema';

export default class WorkRequestFormComponent extends Component {
  @tracked values = {
    firstName: '',
    lastName: '',
  };
  @tracked errors = {};

  @action
  changeFirstName(event) {
    this.values.firstName = event.target.value;
  }
  @action
  changeLastName(event) {
    this.values.lastName = event.target.value;
  }

  @action
  closeAddressRegisterSelector() {}

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
