import React from 'react';
import BaseCard from '../BaseCard/BaseCard';
import './IndexCard.scss';

function IndexCard() {
  return (
    <div className="IndexCard">
      <BaseCard>
        <div className="index-post">
          <div className="card__image">
            <img src="https://homeworlddesign.com/wp-content/uploads/2019/08/Stark-House-5-880x660.jpg" alt="Property" />
          </div>
          <div className="card__info">
            <div className="card__info__user">
              <h3> TITULO </h3>
            </div>
            <p>Smoltown, Empty Street, 123</p>
          </div>
          <div className="card__stats">
            <p className="card__stats__title">Bathrooms</p>
            <div className="card__stats__info">
              <p> 1 </p>
            </div>
          </div>
          <div className="card__stats">
            <p className="card__stats__title"> Bedrooms</p>
            <div className="card__stats__info">
              <p> 3 </p>
            </div>
          </div>
          <div className="card__stats">
            <p className="card__stats__title">Size</p>
            <div className="card__stats__info">
              <p>
                150 m
                <sup>2</sup>
              </p>
            </div>
          </div>
          <div className="card__stats">
            <p className="card__stats__title">Type</p>
            <div className="card__stats__info">
              <p> Cabin </p>
            </div>
          </div>
          <div className="card__stats">
            <p className="card__stats__title">Listing type</p>
            <div className="card__stats__info">
              <p> Sell </p>
            </div>
          </div>
          <div className="card__stats">
            <p className="card__stats__title">Price</p>
            <div className="card__stats__info">
              <p> 100000 </p>
            </div>
          </div>
          <div className="card__stats">
            <p className="card__stats__title">Posted</p>
            <div className="card__stats__info">
              <p> 13/02/02 </p>
            </div>
          </div>
        </div>
      </BaseCard>
    </div>
  );
}

export default IndexCard;
