import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';

import {
  voxImplantResetCall,
} from 'actions/voxImplant';

import styles from './CallControlers.scss';


class CallControlers extends Component {

  static propTypes = {
    callStatus: PropTypes.any,

    voxImplantResetCall: PropTypes.func.isRequired,
  }

  render() {
    const {
      callStatus,
      voxImplantResetCall,
    } = this.props;

    const rejectCallOptions = {
      onClick: voxImplantResetCall,
      className: styles.rejectCall,
    };

    return (
      <div className={cx(styles.callControlers, {
        [styles.callControlersActive]: callStatus,
      })}>
      < div className={styles.pause}>
          <i className="zmdi zmdi-pause" />
          {/* zmdi zmdi-play */}
        </div>
        <div className={styles.mute}>
          <i className="zmdi zmdi-mic-off" />
          {/* zmdi zmdi-mic */}
        </div>
        <div {...rejectCallOptions}>
          <i className="zmdi zmdi-phone-end" />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.voxImplant.caller,
});

const mapDispatchToProps = {
  voxImplantResetCall,
}

export default connect(mapStateToProps, mapDispatchToProps)(CallControlers);
