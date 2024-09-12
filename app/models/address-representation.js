import Model, { attr } from '@ember-data/model';

export default class AddressRepresentationModel extends Model {
  @attr('string') municipalityName;
  @attr('string') streetName;
  @attr('string') postalCode;
  @attr('string') busNumber;
}
