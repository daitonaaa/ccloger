import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const pureLink = ({ className, to, title, icon }) => (
  <Link className={className} to={to}>
    {
      icon && (
        <i className={icon} />
      )
    }
    {title}
  </Link>
);

pureLink.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  to: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default pureLink;
