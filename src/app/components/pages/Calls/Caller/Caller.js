import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';

import {
  Input,
  Button,
} from 'components/common';
import Logger from './Logger';
import CallDisplay from './CallDisplay';
import CallControlers from './CallControlers';

import {
  setDialing,
  voxImplantCall,
} from 'actions/voxImplant';

import styles from './Caller.scss';


class Caller extends Component {

  static propTypes = {
    callStatus: PropTypes.any,
    state: PropTypes.string.isRequired,
    dialingOptions: PropTypes.object.isRequired,

    setDialing: PropTypes.func.isRequired,
    voxImplantCall: PropTypes.func.isRequired,
  }

  renderCallerPhone() {
    const {
      setDialing,
      dialingOptions,
      voxImplantCall,
    } = this.props;

    const inputTelOptions = {
      value: dialingOptions.inc,
      placeholder: dialingOptions.mode === 'tel'
        ? '+79222222222'
        : 'user@sipdomain.zone',
      onChange: (vl) => setDialing('inc', vl),
    };

    const buttonCallOptions = {
      title: 'Вызвать',
      onClick: voxImplantCall,
      disabled: dialingOptions.inc.length < 5,
    };

    return (
      <div className={styles.callerPhone}>
        <div className={styles.title}>
          {
            dialingOptions.mode === 'tel'
              ? 'По номеру телефона'
              : 'По SIP адресу'
          }
        </div>
        <Input {...inputTelOptions} />
        <div className={styles.telControlers}>
          <Button {...buttonCallOptions} />
          {this.renderModeOption()}
        </div>
      </div>
    )
  }

  renderModeOption() {
    const {
      setDialing,
      dialingOptions,
    } = this.props;

    const modeTelOptions = {
      onClick: () => setDialing('mode', 'tel'),
      className: cx(styles.telModeItem, {
        [styles.telModeItemActive]: dialingOptions.mode === 'tel'
      }),
    }

    const modeSipOptions = {
      onClick: () => setDialing('mode', 'sip'),
      className: cx(styles.telModeItem, {
        [styles.telModeItemActive]: dialingOptions.mode === 'sip'
      }),
    }

    return (
      <div className={styles.telMode}>
        <div {...modeTelOptions}>
          <i className="zmdi zmdi-smartphone-android" />
        </div>
        <div {...modeSipOptions}>
          <i className="zmdi zmdi-laptop-chromebook" />
        </div>
      </div>
    )
  }

  render() {
    const {
      state,
      callStatus,
    } = this.props;

    return (
      <div className={styles.caller}>
        <div className={cx(styles.tel, {
          [styles.noReady]: state !== 'SUCCESS_CONNECT',
        })}>
          {state !== 'SUCCESS_CONNECT' && <div className={styles.loading} />}
          {!callStatus && this.renderCallerPhone()}
          <CallDisplay />
          <CallControlers />
        </div>
        <Logger />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.voxImplant.main,
  ...state.voxImplant.caller,
});

const mapDispatchToProps = {
  setDialing,
  voxImplantCall,
}

export default connect(mapStateToProps, mapDispatchToProps)(Caller);
