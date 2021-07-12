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

// const user = {
//   firstName: 'John',
//   lastName: 'Doe',
//   email: 'johndoe@example.com',
//   access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiO
// jE1MiwiaWF0IjoxNjIzNDczOTMwfQ.zXFM-exk-29-afuxH7glrAmrxZokQeCZXd8r_efIbvg',
//   token_type: 'Bearer',
// };

describe('Home', () => {
  describe('when user is not logged in', () => {
    it('renders the home page', () => {
      const tree = renderer.create(<TestRouter path="/" />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
