import React from 'react';
import PropTypes from 'prop-types';

import './MeetingCard.scss';

import BaseCard from '../BaseCard/BaseCard';

function MeetingCard(props) {
  const { meeting } = props;

  const { sellerUser, buyerUser } = meeting;

  const sellerUsername = `${sellerUser.firstName} ${sellerUser.lastName}`;
  const buyerUsername = `${buyerUser.firstName} ${buyerUser.lastName}`;

  return (
    <BaseCard>
      <div className="MeetingCard">
        <div className="card__info">
          <div className="card__info__user">
            <img src={sellerUser.avatarLink} alt={`${sellerUsername} Profile`} />
            <h3>
              [Seller]
              {` ${sellerUsername} (${sellerUser.email})`}
            </h3>
          </div>
        </div>
        <div className="card__info">
          <div className="card__info__user">
            <img src={buyerUser.avatarLink} alt={`${buyerUsername} Profile`} />
            <h3>
              [Buyer]
              {` ${buyerUsername} (${buyerUser.email})`}
            </h3>
          </div>
        </div>
        <div className="card__stats">
          <p className="card__stats__title">Type</p>
          <div className="card__stats__info">
            <p>{meeting.type}</p>
          </div>
        </div>
        <div className="card__stats">
          <p className="card__stats__title">Meeting Date</p>
          <div className="card__stats__info">
            <p>{`${new Date(meeting.date).toLocaleString()}`}</p>
          </div>
        </div>
        <div className="card__stats">
          <p className="card__stats__title">Created</p>
          <div className="card__stats__info">
            <p>{`${new Date(meeting.createdAt).toLocaleDateString()}`}</p>
          </div>
        </div>
      </div>
    </BaseCard>
  );
}

MeetingCard.propTypes = {
  meeting: PropTypes.shape({
    type: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    sellerUser: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatarLink: PropTypes.string.isRequired,
    }).isRequired,
    buyerUser: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatarLink: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MeetingCard;
