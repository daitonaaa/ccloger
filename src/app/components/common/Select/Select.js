import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import outsideClick from 'react-click-outside';

import { isNotEmpty } from 'helpers';

import Option from './Option';

import './Select.scss';


class Select extends Component {

  static propTypes = {
    disabled: PropTypes.bool,
    labelKey: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    defaultTitle: PropTypes.string,
    options: PropTypes.any.isRequired,

    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    labelKey: 'label',
    defaultTitle: 'Выберите значение',
  }

  state = {
    showOptions: false,
  }

  handleClickOutside() {
    const { showOptions } = this.state;

    if (showOptions) this.setState({ showOptions: false });
  }

  handleSelect = (itemOption) => {
    const { onChange } = this.props;

    this.setState({ showOptions: false });
    onChange(itemOption);
  }

  toggleOpenSelect = () => {
    const { showOptions } = this.state;

    this.setState({ showOptions: !showOptions });
  }

  renderSelectedTitle() {
    const { defaultTitle, options, value, labelKey } = this.props;

    const selectedOption = options.find(option => option.id === value);

    if (selectedOption) return selectedOption[labelKey];
    else return defaultTitle;
  }

  render() {
    const { options, labelKey, className, value } = this.props;

    const { showOptions } = this.state;

    const selectClassName = cx('select', {
      showOptions,
      [className]: !!className,
    });

    return (
      <div className={selectClassName}>
        <div className="select-box" onClick={this.toggleOpenSelect}>
          {this.renderSelectedTitle()}
        </div>
        {
          (showOptions && isNotEmpty(options)) && (
            <div className="select-options">
              <div className="select-options__list">
                  {
                    options.map((item, index) => (
                      <Option
                        item={item}
                        key={index}
                        value={value}
                        labelKey={labelKey}
                        onSelectOption={this.handleSelect}
                      />
                    ))
                  }
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default outsideClick(Select);