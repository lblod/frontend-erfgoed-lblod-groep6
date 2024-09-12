import Model, { attr } from '@ember-data/model';

export default class LocationParcelModel extends Model {
  @attr('string') cadastralDepartment;
  @attr('string') section;
  @attr('string') number;
}
