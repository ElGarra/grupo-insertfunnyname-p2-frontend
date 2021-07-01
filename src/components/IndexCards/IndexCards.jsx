import React from 'react';
import './IndexCards.scss';

function IndexCards() {
  return (
    <div className="IndexCards">
      <div className="cards-list">
        <div className="card index-post">
          <div className="card__image">
            <img src="https://homeworlddesign.com/wp-content/uploads/2019/08/Stark-House-5-880x660.jpg" alt="Property" />
          </div>
          <div className="card__info">
            <div className="card__info__user">
              <img
                className="poster-user-picture"
                src="https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a_400x400.jpeg"
                alt="Profile"
              />
              <h3> El Gato </h3>
            </div>
          </div>
          <div className="card__stats">
            <p className="card__stats__title">Address</p>
            <div className="card__stats__info">
              <h5> Smoltown, Empty Street, 123 </h5>
            </div>
          </div>
          <div className="card__stats">
            <p className="card__stats__title">Size</p>
            <div className="card__stats__info">
              <h5>
                {'150 \u33A1'}
              </h5>
            </div>
          </div>
          <div className="card__stats">
            <p className="card__stats__title">Date</p>
            <h5 className="card__stats__info"> 13/02/2002 </h5>
          </div>
        </div>
        <div className="card index-post">
          <div className="card__image">
            <img src="http://prod-upp-image-read.ft.com/8eba9f44-15ce-11e3-b519-00144feabdc0" alt="Property" />
          </div>
          <div className="card__info">
            <div className="card__info__user">
              <img
                className="poster-user-picture"
                src="https://i.pinimg.com/originals/17/b0/c8/17b0c81e5d4cb4848d6b3b371d02c036.jpg"
                alt="Profile"
              />
              <h3> El Gaton</h3>
            </div>
          </div>
          <div className="card__stats">
            <p className="card__stats__title">Address</p>
            <div className="card__stats__info">
              <h5> Smoltown, Empty Street, 123 </h5>
            </div>
          </div>
          <div className="card__stats">
            <p className="card__stats__title">Size</p>
            <div className="card__stats__info">
              <h5>
                {'150 \u33A1'}
              </h5>
            </div>
          </div>
          <div className="card__stats">
            <p className="card__stats__title">Date</p>
            <h5 className="card__stats__info"> 13/02/2002 </h5>
          </div>
        </div>
        <div className="card index-post">
          <div className="card__image">
            <img src="https://static.onecms.io/wp-content/uploads/sites/37/2016/02/15230656/white-modern-house-curved-patio-archway-c0a4a3b3.jpg" alt="Property" />
          </div>
          <div className="card__info">
            <div className="card__info__user">
              <img
                className="poster-user-picture"
                src="https://petcostumecenter.com/wp-content/uploads/2020/05/580413_PS_PAW_BILL_SUIT-scaled.jpg"
                alt="Profile"
              />
              <h3> El Gatubela </h3>
            </div>
          </div>
          <div className="card__stats">
            <p className="card__stats__title">Address</p>
            <div className="card__stats__info">
              <h5> Smoltown, Empty Street, 123 </h5>
            </div>
          </div>
          <div className="card__stats">
            <p className="card__stats__title">Size</p>
            <div className="card__stats__info">
              <h5>
                {'150 \u33A1'}
              </h5>
            </div>
          </div>
          <div className="card__stats">
            <p className="card__stats__title">Date</p>
            <h5 className="card__stats__info"> 13/02/2002 </h5>
          </div>
        </div>
        <div className="card index-post">
          <div className="card__image">
            <img src="https://cdn.archilovers.com/story/688874c3-7680-45ee-afde-2d5ae6f91494.jpg" alt="Property" />
          </div>
          <div className="card__info">
            <div className="card__info__user">
              <img
                className="poster-user-picture"
                src="https://64.media.tumblr.com/ba573073430086b9e50e3846c777265d/7eab2a11498037f7-2a/s128x128u_c1/3266e8255213d6e074155361ddea38ef4525d2cc.jpg"
                alt="Profile"
              />
              <h3> AvoCATo </h3>
            </div>
          </div>
          <div className="card__stats">
            <p className="card__stats__title">Address</p>
            <div className="card__stats__info">
              <h5> Smoltown, Empty Street, 123 </h5>
            </div>
          </div>
          <div className="card__stats">
            <p className="card__stats__title">Size</p>
            <div className="card__stats__info">
              <h5>
                {'150 \u33A1'}
              </h5>
            </div>
          </div>
          <div className="card__stats">
            <p className="card__stats__title">Date</p>
            <h5 className="card__stats__info"> 13/02/2002 </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndexCards;
