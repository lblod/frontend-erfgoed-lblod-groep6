import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class PersonModel extends Model {
  @attr('string') lastName;
  @attr('string') usedFirstName;
  @belongsTo('identifier', { async: true }) identifier;
  @hasMany('contact-point', { async: true }) contactPoints;
}
