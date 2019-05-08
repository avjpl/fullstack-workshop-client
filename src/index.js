import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import "./index.css";
import App from "./App";

const client = new ApolloClient({
  uri: "https://6v1lkoqpy3.sse.codesandbox.io/"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
