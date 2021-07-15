import React from 'react';
import PropTypes from 'prop-types';

import './CommentList.scss';
import CommentCard from '../Cards/CommentCard/CommentCard';

const CommentList = (props) => {
  const { comments } = props;

  return (
    <div className="CommentList">
      {comments.map((comment) => (
        <CommentCard key={comment.id} user={comment.User} comment={comment} />
      ))}
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentList;
