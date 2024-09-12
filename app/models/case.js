import Model, { attr } from '@ember-data/model';

export default class CaseModel extends Model {
  @attr('datetime') created;
}
