import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';

import {
  voxImplantInit,
  clientDevicesAudit,
} from 'actions/voxImplant';

import Caller from './Caller';
import Indicators from './Indicators';
import { PageHeader } from 'components/common';


class Calls extends Component {

  static propTypes = {
    route: PropTypes.object.isRequired,
    state: PropTypes.string.isRequired,

    voxImplantInit: PropTypes.func.isRequired,
    clientDevicesAudit: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const {
      state,
      voxImplantInit,
    } = this.props; 

    if (state !== 'CONNECTING') voxImplantInit();
  }

  componentDidUpdate(prevProps) {
    const {
      state,
      clientDevicesAudit,
    } = this.props;

    if (prevProps.state !== 'SUCCESS_CONNECT' && state === 'SUCCESS_CONNECT') {
      clientDevicesAudit();
    }
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
        <Caller />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.voxImplant.main,
});

const mapDispatchToProps = {
  voxImplantInit,
  clientDevicesAudit,
}

export default connect(mapStateToProps, mapDispatchToProps)(Calls);
