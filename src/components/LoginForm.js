/*
TODO: Creating a Mutation component:

1. Create a Mutation component to login the user by wrapping the Form component.
2. Pass the login function down as a prop to Form.
3. Use the onCompleted prop on Mutation to console.log whether the mutation completed successfully.

Note: We will be wiring up the rest of the login workflow in the next exercises.

TODO: Local state management:

1. Create an IS_LOGGED_IN query to determine whether the user is logged in.
2. Wrap the login Mutation component with your Query component. Pass the result of the query to the Form component.
3. When the login mutation completes, set the login token to localStorage under a key called "token". Write isLoggedIn to the cache directly.
4. When the user logs out, fill in the this.logout method by writing isLoggedIn to the cache directly and clearing local storage.
*/

import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const LOGIN_USER = gql`
  mutation loginUser($email: String!) {
    login(email: $email)
  }
`;

const Form = ({ isLoggedIn, login, logout }) => {
  let input = React.createRef();

  return (
    <div style={styles.container}>
      {isLoggedIn ? (
        <button onClick={logout}>Log Out</button>
      ) : (
        <form
          onSubmit={e => {
            e.preventDefault();
            const email = input.current.value;
            login({
              variables: { email }
            });
          }}
        >
          <input type="text" ref={input} placeholder="Email" />
          <button className="button">Log in</button>
        </form>
      )}
    </div>
  );
};

export default class Login extends Component {
  logout = () => {
    // fill in this method for the local state exercises
  };

  render = () => (
    <Mutation mutation={LOGIN_USER}>
      {login => <Form login={login} logout={this.logout} isLoggedIn={false} />}
    </Mutation>
  );
}

const styles = {
  container: { marginBottom: 16, width: "100%", textAlign: "right" }
};
