import React, { useState } from "react";
import { AiFillCloseCircle, AiFillDelete } from "react-icons/ai"; 
import { ClipLoader } from "react-spinners"; // Import a spinner component

const symptoms = ['itching',
  ' skin_rash',
  ' nodal_skin_eruptions',
  ' dischromic _patches',
  ' continuous_sneezing',
  ' shivering',
  ' chills',
  ' watering_from_eyes',
  ' stomach_pain',
  ' acidity',
  ' ulcers_on_tongue',
  ' vomiting',
  ' cough',
  ' chest_pain',
  ' yellowish_skin',
  ' nausea',
  ' loss_of_appetite',
  ' abdominal_pain',
  ' yellowing_of_eyes',
  ' burning_micturition',
  ' spotting_ urination',
  ' passage_of_gases',
  ' internal_itching',
  ' indigestion',
  ' muscle_wasting',
  ' patches_in_throat',
  ' high_fever',
  ' extra_marital_contacts',
  ' fatigue',
  ' weight_loss',
  ' restlessness',
  ' lethargy',
  ' irregular_sugar_level',
  ' blurred_and_distorted_vision',
  ' obesity',
  ' excessive_hunger',
  ' increased_appetite',
  ' polyuria',
  ' sunken_eyes',
  ' dehydration',
  ' diarrhoea',
  ' breathlessness',
  ' family_history',
  ' mucoid_sputum',
  ' headache',
  ' dizziness',
  ' loss_of_balance',
  ' lack_of_concentration',
  ' stiff_neck',
  ' depression',
  ' irritability',
  ' visual_disturbances',
  ' back_pain',
  ' weakness_in_limbs',
  ' neck_pain',
  ' weakness_of_one_body_side',
  ' altered_sensorium',
  ' dark_urine',
  ' sweating',
  ' muscle_pain',
  ' mild_fever',
  ' swelled_lymph_nodes',
  ' malaise',
  ' red_spots_over_body',
  ' joint_pain',
  ' pain_behind_the_eyes',
  ' constipation',
  ' toxic_look_(typhos)',
  ' belly_pain',
  ' yellow_urine',
  ' receiving_blood_transfusion',
  ' receiving_unsterile_injections',
  ' coma',
  ' stomach_bleeding',
  ' acute_liver_failure',
  ' swelling_of_stomach',
  ' distention_of_abdomen',
  ' history_of_alcohol_consumption',
  ' fluid_overload',
  ' phlegm',
  ' blood_in_sputum',
  ' throat_irritation',
  ' redness_of_eyes',
  ' sinus_pressure',
  ' runny_nose',
  ' congestion',
  ' loss_of_smell',
  ' fast_heart_rate',
  ' rusty_sputum',
  ' pain_during_bowel_movements',
  ' pain_in_anal_region',
  ' bloody_stool',
  ' irritation_in_anus',
  ' cramps',
  ' bruising',
  ' swollen_legs',
  ' swollen_blood_vessels',
  ' prominent_veins_on_calf',
  ' weight_gain',
  ' cold_hands_and_feets',
  ' mood_swings',
  ' puffy_face_and_eyes',
  ' enlarged_thyroid',
  ' brittle_nails',
  ' swollen_extremeties',
  ' abnormal_menstruation',
  ' muscle_weakness',
  ' anxiety',
  ' slurred_speech',
  ' palpitations',
  ' drying_and_tingling_lips',
  ' knee_pain',
  ' hip_joint_pain',
  ' swelling_joints',
  ' painful_walking',
  ' movement_stiffness',
  ' spinning_movements',
  ' unsteadiness',
  ' pus_filled_pimples',
  ' blackheads',
  ' scurring',
  ' bladder_discomfort',
  ' foul_smell_of urine',
  ' continuous_feel_of_urine',
  ' skin_peeling',
  ' silver_like_dusting',
  ' small_dents_in_nails',
  ' inflammatory_nails',
  ' blister',
  ' red_sore_around_nose',
  ' yellow_crust_ooze'];

const SymptomSelect = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]); // State to track selected symptoms
  const [diseaseInfo, setDiseaseInfo] = useState(null); // State to store the result from API
  const [error, setError] = useState(null); // Error handling state
  const [loading, setLoading] = useState(false); // State to track loading status

  function handleReset(e) {
    e.preventDefault();
    setDiseaseInfo(null);
    setSelectedSymptoms([]);
    setError(null); // Clear error on reset
  }

  const handleSelect = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value && !selectedSymptoms.includes(value)) {
      setSelectedSymptoms([...selectedSymptoms, value]);
    }
  };

  const handleRemoveLastSymptom = (e) => {
    e.preventDefault();
    setSelectedSymptoms(selectedSymptoms.slice(0, -1)); // Remove the last element in the array
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSymptoms.length < 3) {
      setError("Please select at least three symptoms.");
      return;
    }
    

    const symptomObject = symptoms.reduce((acc, symptom) => {
      acc[symptom] = [selectedSymptoms.includes(symptom) ? 1 : 0];
      return acc;
    }, {});

    setLoading(true); // Set loading to true when request starts
    setError(null); // Clear previous errors
    setDiseaseInfo(null); // Clear previous data

    try {
      const response = await fetch("https://disease-recommendation-api.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(symptomObject),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendation.");
      }

      const data = await response.json();
      if (data.disease && data.doctor_type) {
        setDiseaseInfo(data);
      } else {
        setError("Invalid response from the server.");
      }
    } catch (error) {
      setError(error.message || "An unknown error occurred.");
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <div style={{ paddingInline: '70px' }}>
      <h1>Disease and Doctor Recommendation</h1>

      {/* Dropdown for selecting symptoms */}
      <div className="form-component">
        <form style={{ display: "flex", alignItems: 'center' }}>
          <select onChange={handleSelect} style={{ width: "50%" }}>
            <option value="">Select Symptoms</option>
            {symptoms.map((symptom, index) => (
              <option key={index} value={symptom}>
                {symptom.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </form>
      </div>

      {/* Display selected symptoms */}
      <div>
        <h3>Selected Symptoms:</h3>
        <ol style={{ paddingLeft: "20px" }}>
          {selectedSymptoms.map((symptom, index) => (
            <li
              key={index}
              style={{
                fontSize: "18px",
                color: "#007bff",
                fontWeight: "bold",
                marginBottom: "10px",
                padding: "5px 0",
                listStyleType: "square",
              }}
            >
              {symptom.replace(/_/g, " ")}
            </li>
          ))}
        </ol>
      </div>

      {/* Button to remove the last selected symptom */}
      <div className="form-component" style={{ marginTop: "20px" }}>
        <button className="delete-button" onClick={handleRemoveLastSymptom} style={{ marginRight: "20px" }}>
          <AiFillDelete className="delete-icon" /> Remove Last
        </button>
      </div>

      {/* Button to submit and get recommendation */}
      <div className="form-component">
        <form style={{ display: "flex" ,flexDirection:'column', alignItems: 'center' }}>
          <button onClick={handleSubmit}>Get Recommendation</button>
          <button onClick={handleReset} style={{ marginLeft: '20px' }}>Reset</button>
        </form>
      </div>

      {/* Display error if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display the loading spinner */}
      {loading && (
        <div style={{ marginTop: "20px" }}>
          <ClipLoader color={"#007bff"} size={50} />
          <p>Loading...</p>
        </div>
      )}

      {/* Display the recommendation result */}
      {!loading && diseaseInfo && (
        <div >
          <div style={{display:"flex" ,flexDirection:'column',alignItems:"center"}}>
            <h3>Recommended Disease and Doctor Type</h3>
            <br />
            <p><strong>Disease:</strong> {diseaseInfo.disease.join(', ')}</p>
            <br />
            <p><strong>Doctor Type:</strong> {diseaseInfo.doctor_type.join(', ')}</p>
            <br />
            <hr />
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomSelect;
