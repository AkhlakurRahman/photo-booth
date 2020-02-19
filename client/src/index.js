import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-components';
import ApolloClient from 'apollo-boost';

import './index.scss';
import App from './App';
import reducers from './reducers';

const client = new ApolloClient({
  uri: 'https://photo-booths.herokuapp.com/graphql'
});

const store = createStore(reducers);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
