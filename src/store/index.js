import { combineReducers, applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import session from './session';
import dogsReducer from './dogs';


const rootReducer = combineReducers({
  session,
  dogs: dogsReducer,

});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configStore = configureStore({
  reducer: rootReducer,
  middleware: enhancer,
});

export default configStore;
