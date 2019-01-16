import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './CallDisplay.scss';


const CallDisplay = ({ callStatus }) => {
  const isConnecting = callStatus === 'CONNECTING';

  return (
    <div className={cx(styles.callDisplay, {
      [styles.callDisplayVisible]: isConnecting,
      [styles.callDisplayAnimate]: isConnecting,
    })}>
      <div className={styles.callDisplayIcon}>
        {
          isConnecting && (
            <i className="zmdi zmdi-phone-in-talk" />
          )
        }
      </div>
      <div className={styles.callDisplayInfo}>
        {isConnecting && 'Вызов абонента'}
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
