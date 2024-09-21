import React from "react";
import Hero from "../Components/Hero";
import SymptomSelect from "../Components/SymptomSelect";
import UpcomingModels from "../Components/UpcomingModels";
const ShriDetector = () => {
  return (
    <>
      <Hero
        title={"Shri Disease Detector"}
        imageUrl={"/doctor_r_bg.png"}
        content={"Welcome to Shri Disease Recommendation System, where your health is our priority. Simply select your symptoms, and our advanced system will analyze them to provide possible disease recommendations, helping you understand your health better and take the right steps towards care. It's quick, easy, and designed to assist you in making informed decisions about your well-being."}
      />
      <SymptomSelect/>
      <UpcomingModels/>
    </>
  );
};

export default ShriDetector;