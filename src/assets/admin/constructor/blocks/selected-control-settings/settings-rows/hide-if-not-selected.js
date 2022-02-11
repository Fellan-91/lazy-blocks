const { __ } = wp.i18n;

const { Component } = wp.element;

const { PanelBody, BaseControl, ToggleControl } = wp.components;

export default class HideIfNotSelectedRow extends Component {
  render() {
    const { updateData, data } = this.props;

    return (
      <PanelBody>
        <BaseControl label={__('Hide if block is not selected', '@@text_domain')}>
          <ToggleControl
            label={__('Yes', '@@text_domain')}
            checked={data.hide_if_not_selected === 'true'}
            onChange={(value) => updateData({ hide_if_not_selected: value ? 'true' : 'false' })}
          />
        </BaseControl>
      </PanelBody>
    );
  }
}
