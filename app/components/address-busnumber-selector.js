import Component from '@glimmer/component';

export default class AdressBusnumberSelectorComponent extends Component {
  get placeholder() {
    return this.args.disabled ? '/' : '';
  }
}
