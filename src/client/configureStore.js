import rootReducer from 'reducers';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';


var ff = true;
const getMiddlewares = browserHistory => {
  if (!ff) return applyMiddleware(
    routerMiddleware(browserHistory),
    thunkMiddleware
  );

  const composeEnhancers = composeWithDevTools({ serialize: true });

  return composeEnhancers(
    applyMiddleware(
      routerMiddleware(browserHistory),
      thunkMiddleware
    )
  );
};

// Формируем главное хранилище
export default function configureStore(initialState, browserHistory) {
  const store = createStore(
    rootReducer(browserHistory),
    initialState,
    getMiddlewares(browserHistory)
  );

  return store;
}
