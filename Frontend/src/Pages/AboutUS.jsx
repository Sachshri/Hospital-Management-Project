import React from "react";
import Hero from "../Components/Hero";
import Biography from "../Components/Biography";
const AboutUS = () => {
  return (
    <>
      <Hero
        title={"Learn More About Us | Shri Medical Institute"}
        imageUrl={"/about.png"}
      />
      <Biography imageUrl={"/whoweare.png"} />
    </>
  );
};

export default AboutUS;
