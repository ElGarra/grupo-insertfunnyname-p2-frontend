import React from 'react';
import BaseCard from '../BaseCard/BaseCard';
import './CommentCard.scss';

function CommentCard() {
  return (
    <div className="IndexCard">
      <BaseCard>
        <div className=" CommentCard">
          <div className="card__info">
            <div className="card__info__user">
              <a href="./profile.html">
                <img
                  className="poster-user-picture"
                  src="https://api.time.com/wp-content/uploads/2020/01/smudge-the-cat-interview.jpg"
                  alt="Profile"
                />
              </a>
              <h3> Puuurrfect </h3>
            </div>
            <p className="card__info__extra">
              Lorem ipsum dolor sit, amet consectetur adipisicing
              elit. Non error quos, dolorem at ratione quia nobis
              ipsam odio eum deleniti aliquam optio tempore nemo
              animi delectus porro doloremque temporibus nisi!
            </p>
          </div>
        </div>
      </BaseCard>
    </div>
  );
}

export default CommentCard;
