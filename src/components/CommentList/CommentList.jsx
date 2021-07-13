import React from 'react';
import PropTypes from 'prop-types';

import './CommentList.scss';
import CommentCard from '../Cards/CommentCard/CommentCard';

const CommentList = (props) => {
  const { comments } = props;

  const tempUser = {
    firstName: 'Test',
    lastName: 'User',
    avatarLink: 'https://api.time.com/wp-content/uploads/2020/01/smudge-the-cat-interview.jpg',
  };
  return (
    <div className="CommentList">
      {comments.map((comment) => (
        <CommentCard key={comment.id} user={tempUser} comment={comment} />
      ))}
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentList;
