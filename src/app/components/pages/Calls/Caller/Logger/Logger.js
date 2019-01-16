import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';

import styles from './Logger.scss';

import Log from './Log';


class Logger extends Component {

  static propTypes = {
    logger: PropTypes.array.isRequired,
  }

  renderLogs() {
    const { logger } = this.props;

    return logger.map((el, i) => (
      <Log key={i} {...el} />
    ));
  }

  render() {
    const { logger } = this.props;

    const isEmpty = !logger.length;

    return (
      <div className={cx(styles.logger, {
        [styles.empty]: isEmpty,
      })}>
        {
          isEmpty && (
            <i className="zmdi zmdi-reader"></i>
          )
        }
        {this.renderLogs()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.voxImplant.caller,
});

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Logger);
