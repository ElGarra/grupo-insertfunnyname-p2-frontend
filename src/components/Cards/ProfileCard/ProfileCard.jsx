import React from 'react';
import PropTypes from 'prop-types';

import BaseCard from '../BaseCard/BaseCard';
import './ProfileCard.scss';

function ProfileCard(props) {
  const { user } = props;
  const username = `${user.firstName} ${user.lastName}`;
  return (
    <BaseCard>
      <div className="ProfileCard">
        <div className="full-post">
          <div className="card__info">
            <div className="card__info__user">
              <img src={user.avatarLink} alt={`${username} Profile`} />
              <h3>{username}</h3>
            </div>
          </div>
          <div className="card__stats">
            <p className="card__stats__title">E-mail</p>
            <div className="card__stats__info">
              <p>{user.email}</p>
            </div>
          </div>
          <div className="card__stats">
            <p className="card__stats__title">Joined</p>
            <div className="card__stats__info">
              <p>{`${new Date(user.createdAt).toLocaleDateString()}`}</p>
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.shape({
    avatarLink: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileCard;
