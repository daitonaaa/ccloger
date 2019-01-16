import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';

import { Loading } from 'components/common';

import styles from './Indicators.scss';


class Indicators extends Component {

  static propTypes = {
    state: PropTypes.string.isRequired,
    userData: PropTypes.object.isRequired,
  }

  render() {
    const {
      state,
      userData,
    } = this.props;

    return (
      <div className={styles.indicators}>
        <div className={styles.initProcess}>
          {
            state === 'CONNECTING' && (
              <div className={styles.isConnecting}>
                <Loading min />
                <span>Соединение...</span>
              </div>
            )
          }
          {
            state === 'CONNECTINON_FAILED' && (
              <div className={cx(styles.isConnecting, {
                [styles.error]: true,
              })}>
                <span>Ошибка при подключении</span>
              </div>
            )
          }
          {
            state === 'SUCCESS_CONNECT' && (
              <div className={styles.isConnected}>
                <i className="zmdi zmdi-network"></i>
                <span>Подключён к сети</span>
              </div>
            )
          }
        </div>
        <div className={styles.tray}>
          {
            state === 'SUCCESS_CONNECT' && (
              <div className={styles.trayItem}>
                <i className="zmdi zmdi-account" />
                <span>Оператор: {userData.displayName}</span>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.voxImplant.main,
});

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Indicators);
