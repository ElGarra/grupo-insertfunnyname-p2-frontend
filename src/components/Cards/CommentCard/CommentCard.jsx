import React, { useState } from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';

import './CommentCard.scss';

import BaseCard from '../BaseCard/BaseCard';
import ElementToggler from '../../ElementToggler/ElementToggler';
import useAuth from '../../../hooks/useAuth';
import CommentEditForm from '../../Forms/CommentEditForm/CommentEditForm';
import BaseButton from '../../BaseButton/BaseButton';
import apiClient from '../../../apis/backend';

const CommentCard = (props) => {
  const { currentUser } = useAuth();
  const { comment, user } = props;
  const [currentComment, setCurrentComment] = useState(comment);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [deleted, setDeleted] = useState(false);

  const updateComment = (data) => {
    setCurrentComment({ ...currentComment, ...data });
  };

  const deleteComment = async () => {
    try {
      setLoading(true);
      setMessage('');
      const response = await apiClient.deletePropertyComment(
        comment.propertyId,
        comment.id,
        currentUser,
      );
      if (response.status !== 204) {
        throw new Error();
      }
      setLoading(false);
      setDeleted(true);
    } catch (error) {
      setMessage('Could not delete comment');
      setLoading(false);
    }
  };

  if (deleted) {
    return null;
  }

  return (
    <BaseCard>
      <div className="CommentCard">
        <div className="card__info">
          <div className="card__info__user">
            <img src={user.avatarLink} alt={`${user.firstName} ${user.lastName} Profile`} />
            <h3>{`${user.firstName} ${user.lastName}`}</h3>
            <p className="comment-date subtitle">
              {new Date(currentComment.createdAt).toLocaleString()}
            </p>
          </div>
          <p className="card__info__extra">{currentComment.body}</p>
        </div>
        {currentUser && String(jwtDecode(currentUser).sub) === String(currentComment.userId) ? (
          <>
            <ElementToggler prompt="Edit comment">
              <CommentEditForm
                propertyId={currentComment.propertyId}
                commentId={currentComment.id}
                initialValues={{ body: currentComment.body }}
                submitCallback={updateComment}
              />
            </ElementToggler>
            <BaseButton type="button" onClick={deleteComment}>
              Delete comment
            </BaseButton>
            {loading ? <p className="subtitle1">Loading...</p> : null}
            {message ? <p className="subtitle1">{message}</p> : null}
          </>
        ) : null}
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
    id: PropTypes.string.isRequired,
    propertyId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentCard;
