import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class CaseModel extends Model {
  @attr('datetime') created;
  @belongsTo('designation-object', { async: true }) primarySubject;
  @belongsTo('person', { async: true }) Submitter;
  @hasMany('contact-point', { async: true }) contactPoints;
  @belongsTo('postal-item', { async: true }) startedBy;
}
