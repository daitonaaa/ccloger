import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { ConnectedRouter } from 'connected-react-router';

import routes from 'routes/routes';


export default class Root extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    browserHistory: PropTypes.object.isRequired,
  }

  render() {
    const { browserHistory, store } = this.props;
    
    return (
      <Provider store={store}>
        <ConnectedRouter history={browserHistory}>
          {renderRoutes(routes)}
        </ConnectedRouter>
      </Provider>
    )
  }
}
