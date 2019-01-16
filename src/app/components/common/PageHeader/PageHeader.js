import React from 'react';
import PropTypes from 'prop-types';

import styles from './PageHeader.scss';


const PageHeader = ({ pageTitle }) => (
  <div className={styles.pageHeader}>
    <div className={styles.title}>
      {pageTitle}
    </div>
  </div>
);

PageHeader.propTypes ={
  pageTitle: PropTypes.string.isRequired,
}

export default PageHeader;
