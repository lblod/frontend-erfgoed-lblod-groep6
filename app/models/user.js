import Model, { attr, belongsTo } from '@ember-data/model';

export default class UserModel extends Model {
  @attr firstName;
  @attr lastName;

  @belongsTo('account', { async: false, inverse: 'user' }) account;

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
