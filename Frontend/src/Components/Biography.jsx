import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <h4>Who We Are</h4>
        
          <h3>Welcome to Shri – Where People Smile!</h3>
          <p>
            At Shri, we believe that health is the foundation of happiness. Our medical institute is dedicated to bringing smiles to people's faces by providing compassionate care and comprehensive treatment for every disease. With a team of highly skilled specialists across multiple departments, we are committed to offering personalized care tailored to each patient's needs.
          </p>
          <p>
           Our interactive website is designed to make your healthcare experience as seamless as possible. You can book appointments, send messages to our medical professionals, and even leverage our advanced machine learning model to gain insights into potential health concerns.
          </p>
          <p>At Shri, we are here to ensure that every step of your healthcare journey is met with support, innovation, and, most importantly, a smile. Because when you smile, we know we're doing our job right.</p>
          <p>Discover a place where care meets compassion – Welcome to Shri!</p>
        </div>
      </div>
    </>
  );
};

export default Biography;