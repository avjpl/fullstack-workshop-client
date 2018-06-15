import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LoginForm, {
  Form as FormUI,
  IS_LOGGED_IN,
  LOGIN_USER,
} from '../LoginForm';
import { wait, mockMovie } from '../../utils';

Enzyme.configure({ adapter: new Adapter() });

// This is just the UI of the login/logout form.
// No query/mutation components used here.
describe('FormUI', () => {
  it('renders', () => {
    mount(<FormUI />);
  });

  it('renders login form if not logged in', () => {
    const comp = mount(<FormUI />);
    expect(comp.find('form').length).toEqual(1);
  });

  it('renders logout button if logged in', () => {
    const comp = mount(<FormUI isLoggedIn />);
    expect(comp.find('button').text()).toEqual('Log Out');
  });

  // We would also typically test interaction with the buttons here
  // leaving off to keep this file short
});

describe('LoginForm', () => {
  beforeAll(() => {
    global.localStorage = {
      setItem: jest.fn(),
      clear: () => {},
    };
  });

  afterAll(() => {
    gloabl = undefined;
  });

  it('renders', () => {
    mount(
      <MockedProvider mocks={[]}>
        <LoginForm />
      </MockedProvider>,
    );
  });

  it('passes isLoggedIn from query to FormUI', async () => {
    const comp = mount(
      <MockedProvider
        mocks={[
          {
            request: { query: IS_LOGGED_IN },
            result: { data: { isLoggedIn: true } },
          },
        ]}
      >
        <LoginForm />
      </MockedProvider>,
    );

    await wait();
    comp.update();

    expect(comp.find(FormUI).props().isLoggedIn).toEqual(true);
  });

  it('fires login mutation and updates', async () => {
    const comp = mount(
      <MockedProvider
        mocks={[
          {
            request: { query: IS_LOGGED_IN },
            result: { data: { isLoggedIn: false } },
          },
          {
            request: { query: LOGIN_USER, variables: { email: 'a@a.a' } },
            result: { data: { login: 'o wow' } },
          },
        ]}
      >
        <LoginForm />
      </MockedProvider>,
    );

    await wait();
    comp.update();

    const formUI = comp.find(FormUI);

    // button before logging in should be a login button
    expect(comp.find('button').text()).toEqual('Log in');

    // fire login mutation
    formUI.props().login({ variables: { email: 'a@a.a' } });

    await wait();
    comp.update();

    // after logging in, the button should now be a logout button
    // instead of a login button
    expect(comp.find('button').text()).toEqual('Log Out');

    //localStorage.set should also have been called
    expect(global.localStorage.setItem).toHaveBeenCalledWith('token', 'o wow');
  });
});
