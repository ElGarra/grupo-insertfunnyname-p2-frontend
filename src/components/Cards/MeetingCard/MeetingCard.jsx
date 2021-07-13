import React from 'react';
import PropTypes from 'prop-types';

import './MeetingCard.scss';

import BaseCard from '../BaseCard/BaseCard';

function MeetingCard(props) {
  const { meeting } = props;

  const sampleSeller = {
    firstName: 'Joe',
    lastName: 'Mama',
    email: 'joemama@example.com',
  };

  const sellerUsername = `${sampleSeller.firstName} ${sampleSeller.lastName}`;

  const sampleBuyer = {
    firstName: 'Test',
    lastName: 'User',
    email: 'testuser@example.com',
  };

  const buyerUsername = `${sampleBuyer.firstName} ${sampleBuyer.lastName}`;

  return (
    <BaseCard>
      <div className="MeetingCard">
        <div className="card__info">
          <div className="card__info__user">
            <img src={sampleSeller.avatarLink} alt={`${sellerUsername} Profile`} />
            <h3>
              [Seller]
              {` ${sellerUsername} (${sampleSeller.email})`}
            </h3>
          </div>
        </div>
        <div className="card__info">
          <div className="card__info__user">
            <img src={sampleBuyer.avatarLink} alt={`${buyerUsername} Profile`} />
            <h3>
              [Buyer]
              {` ${sellerUsername} (${sampleBuyer.email})`}
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
  }).isRequired,
};

export default MeetingCard;
