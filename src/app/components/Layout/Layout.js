import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { renderRoutes } from 'react-router-config';
import React, { Component, Fragment } from 'react';

import { setAppLoadingStatus } from 'actions/global';

import { Loading } from 'components/common';

import styles from './Layout.scss';

import MainMenu from './MainMenu';


class Layout extends Component {

  static propTypes = {
    route: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,

    // state global
    appLoadingStatus: PropTypes.bool.isRequired,

    setAppLoadingStatus: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { setAppLoadingStatus } = this.props;
    setAppLoadingStatus(true);

    window.addEventListener('load', () => {
      setAppLoadingStatus(false);
    });
  }

  render() {
    const {
      location,
      appLoadingStatus,
      route: { routes },
    } = this.props;

    return (
      <div styleName="layout">
        {
          appLoadingStatus
            ? <Loading />
            : (
              <Fragment>
                <MainMenu location={location} />
                <div styleName="content">
                  {renderRoutes(routes)}
                </div>
              </Fragment>
            )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.global,
});

const mapDispatchToProps = {
  setAppLoadingStatus,
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Layout, styles));
