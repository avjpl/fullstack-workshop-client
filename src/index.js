import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import './index.css';
import App from './App';

const client = new ApolloClient({
  // uri: 'https://fullstack-workshop-server.glitch.me/graphql',
  uri: 'https://fullstack-server-vjmgadwpzl.now.sh',
  request: operation => {
    operation.setContext(context => ({
      headers: {
        ...context.headers,
        authorization: localStorage.getItem('token'),
      },
    }));
  },
  clientState: {
    defaults: {
      isLoggedIn: !!localStorage.getItem('token'),
    },
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
