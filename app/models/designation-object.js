import Model, { belongsTo } from '@ember-data/model';

export default class DesignationObjectModel extends Model {
  @belongsTo('location-parcel', { async: true }) parcel;
  @belongsTo('address-representation', { async: true }) address;
}
