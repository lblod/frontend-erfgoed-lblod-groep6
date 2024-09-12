import Model, { attr, hasMany } from '@ember-data/model';

export default class GebruikerModel extends Model {
  @attr firstName;
  @attr lastName;

  @hasMany('account', { async: false, inverse: 'user' }) account;

  @belongsTo('admin-unit', {
    async: false,
    inverse: null,
  })
  adminUnit;

  get group() {
    return this.adminUnit;
  }

  // used for mock login
  get fullName() {
    return `${this.firstName} ${this.lastName}`.trim();
  }
}
