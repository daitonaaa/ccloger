import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';

import styles from './CallControlers.scss';


class CallControlers extends Component {

  static propTypes = {
    callStatus: PropTypes.any,
  }

  render() {
    const { callStatus } = this.props;

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
        <div className={styles.rejectCall}>
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

}

export default connect(mapStateToProps, mapDispatchToProps)(CallControlers);
