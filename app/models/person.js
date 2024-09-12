import Model, { attr } from '@ember-data/model';

export default class PersonModel extends Model {
  @attr('string') lastName;
  @attr('string') usedFirstName;
}
