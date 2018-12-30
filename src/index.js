import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './index.scss';
import App from './App';


const store = configureStore();

const jsx = (
  <Provider store={ store }>
    <App />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));
