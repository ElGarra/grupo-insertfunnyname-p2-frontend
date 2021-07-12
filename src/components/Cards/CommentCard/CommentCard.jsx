import React from 'react';
import PropTypes from 'prop-types';

import './CommentCard.scss';

import BaseCard from '../BaseCard/BaseCard';

const CommentCard = (props) => {
  const { comment, user } = props;
  return (
    <BaseCard>
      <div className="CommentCard">
        <div className="card__info">
          <div className="card__info__user">
            <img src={user.avatarLink} alt={`${user.firstName} ${user.lastName} Profile`} />
            <h3>{`${user.firstName} ${user.lastName}`}</h3>
            <p className="comment-date subtitle">{new Date(comment.createdAt).toLocaleString()}</p>
          </div>
          <p className="card__info__extra">{comment.body}</p>
        </div>
      </div>
    </BaseCard>
  );
};

CommentCard.propTypes = {
  user: PropTypes.shape({
    avatarLink: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
  comment: PropTypes.shape({
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentCard;
