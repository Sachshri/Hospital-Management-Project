import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const UpcomingModels = () => {
  const UpcomingModelsArray = [
    {
      name: "Cancer Detection",
      imageUrl: "/UpcomingModels/cancer_detection.jpg",
    },
    {
      name: "Tuberculosis Detection",
      imageUrl: "/UpcomingModels/TB.jpg",
    },
    {
      name: "Covid Detection",
      imageUrl: "/UpcomingModels/covid.jpg",
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <div className="container UpcomingModels" style={{margin:'20px'}}>
        <h2 style={{marginBottom:"10px"}}>Upcoming Models</h2>
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={[
            // "superLargeDesktop",
            "desktop",
            "tablet",
            "mobile",
          ]}
        >
          {UpcomingModelsArray.map((depart, index) => {
            return (
              <div key={index} className="card">
                <div className="depart-name">{depart.name}</div>
                <img src={depart.imageUrl} alt="UpcomingModels" />
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default UpcomingModels;