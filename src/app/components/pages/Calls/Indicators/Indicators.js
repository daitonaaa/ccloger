import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';

import { Loading } from 'components/common';

import styles from './Indicators.scss';


class Indicators extends Component {

  static propTypes = {
    init: PropTypes.bool.isRequired,
    userData: PropTypes.string.isRequired,
    indicators: PropTypes.object.isRequired,
  }

  render() {
    const {
      userData,
      indicators,
    } = this.props;

    const statusIsConnectind = indicators.name === 'CONNECTING';
    const statusIsReady = indicators.name === 'SUCCESS_CONNECT';

    return (
      <div className={styles.indicators}>
        <div className={styles.initProcess}>
          {
            statusIsConnectind && (
              <div className={styles.isConnecting}>
                <Loading min />
                <span>{indicators.text}</span>
              </div>
            )
          }
        </div>
        <div className={styles.tray}>
          {
            statusIsReady && (
              <div className={styles.trayItem}>
                <i className="zmdi zmdi-account" />
                <span>{userData.displayName}</span>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.callsVoxImplant,
});

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Indicators);
