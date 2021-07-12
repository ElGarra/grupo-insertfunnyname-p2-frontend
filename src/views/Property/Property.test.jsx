import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Routes from '../../routes/Routes';

const { act } = renderer;

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
    it('renders the property page', () => {
      let testRenderer;
      act(() => {
        testRenderer = renderer.create(<TestRouter path="/property/1" />);
      });
      const tree = testRenderer.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
