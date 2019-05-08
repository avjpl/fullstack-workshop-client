import React from "react";
import ReactDOM from "react-dom";
import ApolloClient, { InMemoryCache, gql } from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import "./index.css";
import App from "./App";

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean
  }
`;

const resolvers = {
  Query: {
    isLoggedIn: () => !!localStorage.getItem("token")
  }
};

const client = new ApolloClient({
  uri: "https://6v1lkoqpy3.sse.codesandbox.io/",
  resolvers,
  typeDefs
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
