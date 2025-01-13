import { useState } from "react";

export function Form({ step, onNextStep, formValues, setFormValues }) {
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues((cur) => ({ ...cur, [name]: value }));

    // Clear error message when input becomes valid
    if (value.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  }

  function validEmail(email) {
    // Regular expression pattern for a valid email address
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Test the email using the regular expression
    return emailPattern.test(email);
  }

  function handleNextStep(e) {
    e.preventDefault();
    // onNextStep(2);
    // return;
    // // edit #ffdd00

    const newErrors = {};

    if (!formValues.name.trim()) {
      newErrors.name = "This field is required.";
    }

    if (!formValues.email.trim()) {
      newErrors.email = "This field is required.";
    } else if (!validEmail(formValues.email.trim())) {
      newErrors.email = "Invalid format for this field.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      onNextStep(2);
    }
  }
  return (
    <form className="form" onSubmit={handleNextStep}>
      <div className="form-fields">
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            placeholder="eg. Harry Potter"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            className={errors.name ? "error" : ""}
          />
          <span className="error-message">
            {errors.name ? errors.name : ""}
          </span>
        </div>

        <div className="field">
          <label>E-mail Address</label>
          <input
            type="text"
            placeholder="eg. harry@hogwarts.com"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          <span className="error-message">
            {errors.email ? errors.email : ""}
          </span>
        </div>
        <div>
          <label>Phone No</label>
          <input
            type="tel"
            placeholder="eg. +91 9876543210"
            id="phone"
            name="phone"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="nav-btns">
        <span></span>
        <button step={step} onClick={handleNextStep}>
          Next Step
        </button>
      </div>
    </form>
  );
}
