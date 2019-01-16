import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import styles from './Loading.scss';


const Loading = ({ min }) => (
    <div className={cx(styles.loading, {
      [styles.loadingMin]: min
    })}>
        <div className={styles.rect}><div></div><div></div><div></div><div></div></div>
    </div>
);

Loading.propTypes = {
    min: PropTypes.bool,
};

export default Loading;
