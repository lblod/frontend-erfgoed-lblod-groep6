import Model, { attr, belongsTo } from '@ember-data/model';

export default class AccountModel extends Model {
  @attr provider;

  @belongsTo('user', {
    async: true,
    inverse: 'account',
  })
  user;
}
