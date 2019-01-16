import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';

import styles from './Input.scss';


class Input extends Component {

  static propTypes = {
    getRef: PropTypes.any,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    type: PropTypes.string,
    fadeIn: PropTypes.bool,
    disabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    noTransform: PropTypes.bool,
    placeholder: PropTypes.string,

    onBlur: PropTypes.func,
    onKeyUp: PropTypes.func,
    onFocus: PropTypes.func,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    fadeIn: false,
  }

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      show: props.fadeIn ? false : true,
    };
  }

  componentDidMount() {
    const {
      getRef,
      fadeIn,
    } = this.props;

    if (getRef) getRef(this.nodeElement);

    if (fadeIn) setTimeout(() => this.setState({ show: true }), 55);
    else this.setState({ show: true });
  }

  componentWillUnmount() {
    this.setState({ show: false });
  }

  handleChange = (e) => {
    const { onChange } = this.props;

    if (onChange) onChange(e.target.value, e);
  }

  handleKeyUp = (e) => {
    const { onKeyUp } = this.props;

    if (onKeyUp) onKeyUp(e);
  }

  handleBlur = () => {
    const { onBlur } = this.props;

    this.setState({ active: false });
    if (onBlur) onBlur();
  }

  handleFocus = (e) => {
    const { onFocus } = this.props;

    this.setState({ active: true });
    if (onFocus) onFocus(e);
  }

  render() {
    const {
      type,
      value,
      disabled,
      className,
      autoFocus,
      placeholder,
      noTransform,
    } = this.props;

    const {
      show,
      active,
    } = this.state;

    const boxClassName = classNames(styles.inputBox, {
      show,
      [className]: !!className,
      [styles.active]: !noTransform && active,
    });

    return (
      <div className={boxClassName}>
        <input
          name={name}
          type={type}
          value={value}
          disabled={disabled}
          autoFocus={autoFocus}
          placeholder={placeholder}
          ref={(input) => this.nodeElement = input}

          onBlur={this.handleBlur}
          onKeyUp={this.handleKeyUp}
          onFocus={this.handleFocus}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Input;
