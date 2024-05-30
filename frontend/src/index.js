import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import App from './App';

// import { positions, transitions, Provider as AlertProvider } from 'react-alert'
// import AlertTemplate from 'react-alert-template-basic'

import { ToastContainer } from 'react-toastify';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

// const options = {
//   timeout: 5000,
//   position: positions.BOTTOM_CENTER,
//   transition: transitions.SCALE
// }

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <AlertProvider template={AlertTemplate} {...options}> */}
      <App />
      <ToastContainer />
      {/* </AlertProvider> */}
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
