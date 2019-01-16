import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';

import VOX from 'constants/voxImplant';

import {
  voxImplantInit,
} from 'actions/callsVoxImplant';

import Indicators from './Indicators';
import { PageHeader } from 'components/common';


class Calls extends Component {

  static propTypes = {
    route: PropTypes.object.isRequired,

    voxImplantInit: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { voxImplantInit } = this.props; 
 
    voxImplantInit();
  }

  render() {
    const { route } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>{route.title}</title>
        </Helmet>
        <PageHeader pageTitle={route.title} />
        <Indicators />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.callsVoxImplant,
});

const mapDispatchToProps = {
  voxImplantInit,
}

export default connect(mapStateToProps, mapDispatchToProps)(Calls);
