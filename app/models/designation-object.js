import Model, { attr, belongsTo } from '@ember-data/model';

export default class DesignationObjectModel extends Model {
  @attr name;
  @attr adminUnitName;
  @attr fullAddress;
  @belongsTo('location-parcel', { async: true }) parcel;
  @belongsTo('address-representation', { async: true }) address;
}
