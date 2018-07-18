import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import '../static/reset.css';
import {Provider} from 'react-redux'
import store from './store';
ReactDOM.render(<Provider store={store}><App></App></Provider>,document.querySelector('.app'))