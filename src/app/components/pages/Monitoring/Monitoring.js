import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import React, { Component, Fragment } from 'react';

import { PageHeader } from 'components/common';


class Monitoring extends Component {

  static propTypes = {
    route: PropTypes.object.isRequired,
  }

  render() {
    const { route } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>{route.title}</title>
        </Helmet>
        <PageHeader pageTitle={route.title} />
      </Fragment>
    )
  }
}

export default Monitoring;
