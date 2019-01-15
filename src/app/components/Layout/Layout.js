import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { renderRoutes } from 'react-router-config';

import styles from './Layout.scss';

import MainMenu from './MainMenu';


class Layout extends Component {

  static propTypes = {
    route: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }

  render() {
    const { route: { routes }, location } = this.props;

    return (
      <div styleName="layout">
        <MainMenu location={location} />
        <div styleName="content">
          {renderRoutes(routes)}
        </div>
      </div>
    )
  }
}

export default CSSModules(Layout, styles);
