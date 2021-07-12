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

describe('Properties', () => {
  describe('when user is not logged in', () => {
    it('renders the properties page', () => {
      const tree = renderer.create(<TestRouter path="/properties" />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
