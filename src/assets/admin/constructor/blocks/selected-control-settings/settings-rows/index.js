import getControlTypeData from '../../../../utils/get-control-type-data';

import LabelRow from './label';
import NameRow from './name';
import TypeRow from './type';
import RequiredRow from './required';
import ControlSpecificRows from './control-specific-rows';
import DefaultRow from './default';
import HelpRow from './help';
import PlacementRow from './placement';
import WidthRow from './width';
import HideIfNotSelectedRow from './hide-if-not-selected';
import SaveInMetaRow from './save-in-meta';

const { Component } = wp.element;

const { applyFilters } = wp.hooks;

export default class settingsRows extends Component {
  render() {
    const { data, id } = this.props;

    const controlTypeData = getControlTypeData(data.type);

    const rows = applyFilters(
      'lzb.constructor.control.settings-rows',
      {
        label: LabelRow,
        name: NameRow,
        type: TypeRow,
        control_specific_rows: ControlSpecificRows,
        default: DefaultRow,
        help: HelpRow,
        placement: PlacementRow,
        width: WidthRow,
        required: RequiredRow,
        hide_if_not_selected: HideIfNotSelectedRow,
        save_in_meta: SaveInMetaRow,
      },
      this.props,
      controlTypeData
    );

    return Object.keys(rows).map((i) => {
      const Row = rows[i];
      let allow = true;

      // check restrictions.
      if (controlTypeData && typeof controlTypeData.restrictions[`${i}_settings`] !== 'undefined') {
        allow = controlTypeData.restrictions[`${i}_settings`];
      }

      // conditions to show rows.
      switch (i) {
        case 'placement':
        case 'save_in_meta':
          allow = allow && !data.child_of;
          break;
        case 'width':
        case 'hide_if_not_selected':
          allow = !data.placement || data.placement === 'content' || data.placement === 'both';
          break;
        // no default
      }

      // don't show.
      if (!allow) {
        return null;
      }

      return (
        <Row key={`settings-row-${id}-${i}`} controlTypeData={controlTypeData} {...this.props} />
      );
    });
  }
}
