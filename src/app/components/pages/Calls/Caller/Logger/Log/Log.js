import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import styles from './Log.scss';


const Log = ({ type, text }) => (
  <div className={cx(styles.log, {
    [styles.notif]: type === 'NOTIF',
    [styles.error]: type === 'ERROR',
    [styles.trust]: type === 'TRUST',
  })}>
    &#8226; {text}
  </div>
);

Log.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default Log;
