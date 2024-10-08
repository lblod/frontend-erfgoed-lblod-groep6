import Model, { attr, belongsTo } from '@ember-data/model';

export default class ContactPointModel extends Model {
  @attr('string') name;
  @attr('string') email;
  @attr('string') telephone;
  @belongsTo('address-representation', { async: true }) address;
}
