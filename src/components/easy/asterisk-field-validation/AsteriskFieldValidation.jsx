import React, { useState } from "react";
import "./styles.css";

function AsteriskFieldValidation() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({ name: false, location: false });
  const [successMessage, setSuccessMessage] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    //this will create issue when we click submit when both fields are empty. Location error will override nme error
    // if (!name.trim()) setErrors({ name: true })
    // if (!location.trim()) setErrors({ location: true })

    let newErrors = { name: false, location: false };

    if (!name.trim()) newErrors.name = true;
    if (!location.trim()) newErrors.location = true;

    setErrors(newErrors);

    if (name && location) {
      setSuccessMessage("Submitted Successfully!");
    } else {
      setSuccessMessage("");
    }
  }
  return (
    <div className="container">
      <h1 className="title">Asterisk Field Validation</h1>
      <form className="form" data-testid="form">
        <div className="input-group">
          <label htmlFor="name" className="label">
            Name <span className="asterisk">*</span>
          </label>
          <input
            id="name"
            className="input"
            type="text"
            placeholder="Enter your name"
            data-testid="name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <p data-testid="name-error" className="error">
              Name is required.
            </p>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="location" className="label">
            Location <span className="asterisk">*</span>
          </label>
          <input
            id="location"
            className="input"
            type="text"
            placeholder="Enter your location"
            data-testid="location-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {errors.location && (
            <p data-testid="location-error" className="error">
              Location is required.
            </p>
          )}
        </div>

        <button
          type="submit"
          className="submit-button"
          data-testid="submit-button"
          onClick={onSubmit}
        >
          Submit
        </button>
        {successMessage && (
          <p data-testid="success-message">
            {successMessage}
            <div>Name: {name}</div>
            <div>Location: {location}</div>
          </p>
        )}
      </form>
    </div>
  );
}

export default AsteriskFieldValidation;
