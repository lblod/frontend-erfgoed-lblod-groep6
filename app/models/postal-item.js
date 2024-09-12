import Model, { attr } from '@ember-data/model';

export default class PostalItemModel extends Model {
  @attr('string') body;
}
