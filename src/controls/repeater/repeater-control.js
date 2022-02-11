import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

const { __ } = wp.i18n;
const { Component } = wp.element;
const { BaseControl, Button, Tooltip, ToggleControl } = wp.components;

const { withInstanceId } = wp.compose;

const DragHandle = SortableHandle(() => (
  <Button
    className="lzb-gutenberg-repeater-btn-drag"
    onClick={(e) => {
      e.stopPropagation();
    }}
    role="button"
  >
    <svg
      width="18"
      height="18"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 4h2V2H5v2zm6-2v2h2V2h-2zm-6 8h2V8H5v2zm6 0h2V8h-2v2zm-6 6h2v-2H5v2zm6 0h2v-2h-2v2z" />
    </svg>
  </Button>
));

const SortableItem = SortableElement((data) => (
  <div className="lzb-gutenberg-repeater-item">
    {/* eslint-disable-next-line react/button-has-type */}
    <button
      className={`lzb-gutenberg-repeater-btn${
        data.active ? ' lzb-gutenberg-repeater-btn-active' : ''
      }`}
      onClick={data.onToggle}
    >
      <DragHandle />
      {data.title}
      <div className="lzb-gutenberg-repeater-btn-arrow">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z" />
        </svg>
      </div>
    </button>
    {!data.controlData.rows_min || data.count > data.controlData.rows_min ? (
      // eslint-disable-next-line react/button-has-type
      <button className="lzb-gutenberg-repeater-btn-remove" onClick={data.onRemove}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-2 -2 24 24"
          width="24"
          height="24"
          role="img"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M12 4h3c.6 0 1 .4 1 1v1H3V5c0-.6.5-1 1-1h3c.2-1.1 1.3-2 2.5-2s2.3.9 2.5 2zM8 4h3c-.2-.6-.9-1-1.5-1S8.2 3.4 8 4zM4 7h11l-.9 10.1c0 .5-.5.9-1 .9H5.9c-.5 0-.9-.4-1-.9L4 7z" />
        </svg>
      </button>
    ) : (
      ''
    )}
    {data.active ? data.renderContent() : ''}
  </div>
));
const SortableList = SortableContainer(({ items }) => (
  <div className="lzb-gutenberg-repeater-items">
    {items.map((value, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <SortableItem key={`repeater-item-${index}`} index={index} {...value} />
    ))}
  </div>
));

class RepeaterControl extends Component {
  constructor(...args) {
    super(...args);

    const { controlData } = this.props;

    this.sortRef = wp.element.createRef();

    let activeItem = -1;

    if (controlData.rows_collapsible === 'false') {
      activeItem = -2;
    } else if (controlData.rows_collapsed === 'false') {
      activeItem = -2;
    }

    this.state = {
      activeItem,
    };

    this.getRowTitle = this.getRowTitle.bind(this);
  }

  componentDidMount() {
    const { count = 0, controlData, addRow = () => {} } = this.props;

    // add rows to meet Minimum requirements
    if (controlData.rows_min && controlData.rows_min > 0 && controlData.rows_min > count) {
      const needToAdd = controlData.rows_min - count;

      for (let i = 0; i < needToAdd; i += 1) {
        addRow();
      }
    }
  }

  getRowTitle(i) {
    const { controlData, getInnerControls = () => {} } = this.props;

    let title = controlData.rows_label || __('Row {{#}}', '@@text_domain');

    // add row number.
    title = title.replace(/{{#}}/g, i + 1);

    const innerControls = getInnerControls(i);

    // add inner controls values.
    if (innerControls) {
      Object.keys(innerControls).forEach((k) => {
        const val = innerControls[k].val || '';
        const { data } = innerControls[k];

        title = title.replace(new RegExp(`{{${data.name}}}`, 'g'), val);
      });
    }

    return title;
  }

  render() {
    const {
      label,
      count = 0,
      controlData,
      renderRow = () => {},
      addRow = () => {},
      removeRow = () => {},
      resortRow = () => {},
    } = this.props;

    const items = [];
    for (let i = 0; i < count; i += 1) {
      const active = this.state.activeItem === -2 || this.state.activeItem === i;

      items.push({
        title: this.getRowTitle(i),
        active,
        count,
        controlData,
        onToggle: (e) => {
          e.preventDefault();
          e.stopPropagation();

          if (controlData.rows_collapsible === 'true') {
            this.setState({ activeItem: active ? -1 : i });
          }
        },
        onRemove: (e) => {
          e.preventDefault();
          e.stopPropagation();
          removeRow(i);
        },
        renderContent: () => (
          <div className="lzb-gutenberg-repeater-item-content">{renderRow(i)}</div>
        ),
      });
    }

    return (
      <BaseControl label={label}>
        <div className="lzb-gutenberg-repeater">
          {items.length ? (
            <SortableList
              ref={this.sortRef}
              items={items}
              onSortEnd={({ oldIndex, newIndex }) => {
                resortRow(oldIndex, newIndex);

                if (this.state.activeItem > -1) {
                  this.setState({ activeItem: newIndex });
                }
              }}
              useDragHandle
              helperContainer={() => {
                if (this.sortRef && this.sortRef.current && this.sortRef.current.container) {
                  return this.sortRef.current.container;
                }

                return document.body;
              }}
            />
          ) : (
            ''
          )}
          <div className="lzb-gutenberg-repeater-options">
            <Button
              isSecondary
              isSmall
              disabled={controlData.rows_max && count >= controlData.rows_max}
              onClick={() => {
                addRow();
              }}
            >
              {controlData.rows_add_button_label || __('+ Add Row', '@@text_domain')}
            </Button>
            {controlData.rows_collapsible === 'true' && items.length && items.length > 1 ? (
              <Tooltip text={__('Toggle all rows', '@@text_domain')}>
                <div>
                  {/* For some reason Tooltip is not working without this <div> */}
                  <ToggleControl
                    checked={this.state.activeItem === -2}
                    onChange={() => {
                      this.setState((prevState) => ({
                        activeItem: prevState.activeItem ? -1 : -2,
                      }));
                    }}
                  />
                </div>
              </Tooltip>
            ) : (
              ''
            )}
          </div>
        </div>
      </BaseControl>
    );
  }
}

export default withInstanceId(RepeaterControl);
