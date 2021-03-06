import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './reduxtoolkit/store';
import { persistor } from './reduxtoolkit/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App/>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
