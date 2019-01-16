import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';


class Option extends Component {

  static propTypes = {
    labelKey: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    item: PropTypes.object.isRequired,

    onSelectOption: PropTypes.func.isRequired,
  }

  handleClick = () => {
    const { item, onSelectOption } = this.props;

    onSelectOption(item);
  }

  render() {
    const { item, labelKey, value } = this.props;

    const classNameOption = cx('select-options__item', {
      active: item.id === value,
    });

    return (
      <div className={classNameOption} onClick={this.handleClick}>
        {item[labelKey]}
      </div>
    );
  }
}

export default Option;
