import {combineReducers} from 'redux';
import App from './app';

const allReducers = combineReducers ({
  app: App
});

export default allReducers;
