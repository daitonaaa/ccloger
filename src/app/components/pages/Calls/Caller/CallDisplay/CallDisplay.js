import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactStopwatch from 'react-stopwatch';

import styles from './CallDisplay.scss';


const CallDisplay = ({ callStatus }) => {
  const isConnected = callStatus === 'CONNECTED';
  const isConnecting = callStatus === 'CONNECTING';

  return (
    <div className={cx(styles.callDisplay, {
      [styles.callDisplayAnimate]: isConnecting,
      [styles.callDisplayConnected]: isConnected,
      [styles.callDisplayVisible]: isConnecting || isConnected,
    })}>
      <div className={styles.callDisplayIcon}>
        {isConnecting && <i className="zmdi zmdi-phone" />}
        {isConnected && <i className="zmdi zmdi-phone-in-talk" />}
      </div>
      <div className={styles.callDisplayInfo}>
        {isConnecting && 'Вызов абонента'}
        {isConnected && <ReactStopwatch
          seconds={0}
          minutes={0}
          hours={0}
          onCallback={() => console.log('Finish')}
          render={({ formatted }) => `${formatted}`}
        />}
      </div>
    </div>
  )
}

CallDisplay.propTypes = {
  callStatus: PropTypes.any,
}

const mapStateToProps = (state) => ({
  ...state.voxImplant.caller,
});


export default connect(mapStateToProps)(CallDisplay);
