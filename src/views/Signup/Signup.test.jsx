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

describe('Signup', () => {
  describe('when new user signs up', () => {
    it('renders the signup page', () => {
      const tree = renderer.create(<TestRouter path="/signup" />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
