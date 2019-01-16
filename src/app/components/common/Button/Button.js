import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';

import styles from './Button.scss';


class Button extends Component {

  static propTypes = {
    type: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    title: PropTypes.string.isRequired,

    onClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    disabled: false,
    type: 'blue',
  }

  handleClick = () => {
    const { onClick } = this.props;

    if (onClick) onClick();
  }

  render() {
    const {
      type,
      title,
      disabled,
      className,
    } = this.props;

    const buttonClassName = classNames(styles.button, {
      [styles.disabled]: disabled,
      [styles[type]]: !!type,
      [className]: !!className,
    });

    return (
      <button
        onClick={this.handleClick}
        className={buttonClassName}
      >
        {title}
      </button>
    );
  }
}

export default Button;
