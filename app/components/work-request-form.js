import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { keepLatestTask, task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import workRequestFormSchema from '../domain/work-requests/work-request-form-schema';

export default class WorkRequestFormComponent extends Component {
  @service store;
  @service router;
  @tracked values = {
    firstName: '',
    lastName: '',
    email: '',
    telephone: '',
    rrn: '',
  };
  @tracked errors = {};
  @tracked objectOptions;
  @tracked protectedObject;
  @tracked submitterAddress;
  @tracked address;
  @tracked description;
  @tracked obj;

  searchObjects = keepLatestTask(async (query) => {
    try {
      await timeout(200);
      const objects = await this.store.query('designation-object', {
        filter: {
          'admin-unit-name': this.address.gemeentenaam,
          'full-address': this.address.straatnaam,
          name: query,
        },
        sort: 'name',
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

  @action setSubmitterAddress(address) {
    this.submitterAddress = address;
  }

  @action
  setAddress(address) {
    console.log(address);
    this.address = address;
    this.objectOptions = this.searchObjects.perform();
  }

  @action
  updateEmail(event) {
    this.values.email = event.target.value;
  }

  @action
  updateTelephone(event) {
    this.values.telephone = event.target.value;
  }

  @action
  updateRRN(event) {
    this.values.rrn = event.target.value;
  }

  @action
  updateDescription(event) {
    this.description = event.target.value;
  }

  submitForm = task(async (event) => {
    event.preventDefault();
    const { error, data } = workRequestFormSchema.safeParse({
      firstName: this.values.firstName,
      lastName: this.values.lastName,
      email: this.values.email,
      telephone: this.values.telephone
    });

    if (error) {
      this.errors = error.formErrors.fieldErrors;
      return;
    }

    this.errors = {};
    const adminUnit = await this.store.findRecord(
      'admin-unit',
      '353234a365664e581db5c2f7cc07add2534b47b8e1ab87c821fc6e6365e6bef5'
    ); //cheating Hardcoded Aalter
    const postalItem = this.store.createRecord('postal-item', {
      description: this.description,
    });
    await postalItem.save();
    const caseRecord = this.store.createRecord('case', {
      created: new Date(),
      primarySubject: this.protectedObject,
      adminUnit,
      startedBy: postalItem,
    });
    await caseRecord.save();

    const address = this.store.createRecord('address-representation', {
      streetName: this.submitterAddress.straatnaam,
      municipalityName: this.submitterAddress.gemeentenaam,
      busNumber: this.submitterAddress.huisnummer,
      postalCode: this.submitterAddress.postalCode
    });

    await address.save();
    const cp = this.store.createRecord('contact-point', {
      name: `${this.values.firstName} ${this.values.lastName}`,
      email: this.values.email,
      telephone: this.values.telephone,
      address
    });
    await cp.save();
    const identifier = this.store.createRecord('identifier', {
      identifier: this.values.rrn
    });
    await identifier.save();
    const person = this.store.createRecord('person', {
      firstName: this.values.firstName,
      lastName: this.values.lastName,
      contactPoints: [cp],
      identifier
    });
    await person.save();
    this.router.transitionTo('admin.dashboard');
  });

}
