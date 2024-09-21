import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Department = () => {
  const DepartmentArray = [
    {
      name: "Pediatrics",
      imageUrl: "/Department/pedia.jpg",
    },
    {
      name: "Orthopedics",
      imageUrl: "/Department/ortho.jpg",
    },
    {
      name: "Cardiology",
      imageUrl: "/Department/cardio.jpg",
    },
    {
      name: "Neurology",
      imageUrl: "/Department/neuro.jpg",
    },
    {
      name: "Oncology",
      imageUrl: "/Department/onco.jpg",
    },
    {
      name: "Radiology",
      imageUrl: "/Department/radio.jpg",
    },
    {
      name: "Physical Therapy",
      imageUrl: "/Department/therapy.jpg",
    },
    {
      name: "Dermatology",
      imageUrl: "/Department/derma.jpg",
    },
    {
      name: "ENT",
      imageUrl: "/Department/ent.jpg",
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
      <div className="container Department">
        <h2>Department</h2>
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={[
            // "superLargeDesktop",
            // "desktop",
            "tablet",
            "mobile",
          ]}
        >
          {DepartmentArray.map((depart, index) => {
            return (
              <div key={index} className="card">
                <div className="depart-name">{depart.name}</div>
                <img src={depart.imageUrl} alt="Department" />
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default Department;