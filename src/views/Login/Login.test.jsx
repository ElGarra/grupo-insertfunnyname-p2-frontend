import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Routes from '../../routes/Routes';

function TestRouter({ path }) {
  return (
    <MemoryRouter initialEnteries={[path]}>
      <Routes />
    </MemoryRouter>
  );
}

TestRouter.propTypes = {
  path: PropTypes.string.isRequired,
};

describe('Login', () => {
  describe('when user logs in', () => {
    it('renders the login page', () => {
      const tree = renderer.create(<TestRouter path="/login" />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
