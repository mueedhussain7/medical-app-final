/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const API_PATH = 'http://localhost:8000/api_in_core_php/api/new/register.php';
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const errorDiv = error
    ? <div className="govuk-error-summary" data-module="govuk-error-summary">
      <div role="alert">
        <h2 className="govuk-error-summary__title">There is a problem</h2>
        <div className="govuk-error-summary__body">
          <ul className="govuk-list govuk-error-summary__list">
            <li>
              <a href="#">{error}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    : '';

  const [registerMethod, setRegisterMethod] = useState('');

  const handleRegisterChange = (event) => {
    setRegisterMethod(event.target.value);
  };

  //for Ni
  const [inputs, setInputs] = useState({});
  
  const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setInputs(values => ({...values,[name]: value}));
  };

  const handleSumbit = (e) => {
      e.preventDefault();

      axios.post(API_PATH, inputs).then(function(response){
        if(response.data.message === 'Registered Successfully !'){
          navigate('/login');
        }
        else{
          //error handling goes here
          setError(response.data.message);
        }
      })
  };

  //for alternate details
  const [inputsalt, setInputsAlt] = useState({});
  
  const handleChangeAlt = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setInputsAlt(values => ({...values,[name]: value}));
  };

  const handleSumbitAlt = (e) => {
      e.preventDefault();

      axios.post(API_PATH, inputsalt).then(function(response){
        if(response.data.message === 'Registered Successfully !'){
          navigate('/login');
        }
        else{
          //error handling goes here
          setError(response.data.message);
        }
      })
  };


  return (
    <>
      <div className="govuk-width-container ">
        <a href="/select" className="govuk-back-link">Back</a>
        <main className="govuk-main-wrapper " id="main-content" role="main">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">

              <h1 className="govuk-heading-xl">
                Register using your National Health number or First Name, Surname and Postcode.
              </h1>

              {errorDiv}

              <div className="govuk-form-group">
                <fieldset className="govuk-fieldset" aria-describedby="changed-name-hint">
                  <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
                    <h1 className="govuk-fieldset__heading">Do you know your NHS number?</h1>
                  </legend>
                  <div id="changed-name-hint" className="govuk-hint">
                    It’s on your National Health card, benefit letter, payslip or P60.
                  </div>

                  <div className="govuk-radios govuk-radios--inline" data-module="govuk-radios">
                    <div className="govuk-radios__item">
                      <input
                        className="govuk-radios__input"
                        id="changed-name"
                        name="changed-name"
                        type="radio"
                        defaultValue="yes"
                        checked={registerMethod === "yes"}
                        onChange={handleRegisterChange}
                      />
                      <label className="govuk-label govuk-radios__label" htmlFor="changed-name">Yes</label>
                    </div>

                    <div className="govuk-radios__item">
                      <input
                        className="govuk-radios__input"
                        id="changed-name-2"
                        name="changed-name"
                        type="radio"
                        defaultValue="no"
                        checked={registerMethod === "no"}
                        onChange={handleRegisterChange}
                      />
                      <label className="govuk-label govuk-radios__label" htmlFor="changed-name-2">No</label>
                    </div>
                  </div>
                </fieldset>
              </div>

              {registerMethod === "yes" && (
                <>
                <form onSubmit={handleSumbit}>
                  <div className="govuk-form-group">
                    <label className="govuk-label" htmlFor="national-insurance-number">
                      National Health number
                    </label>
                    <div id="national-insurance-number-hint" className="govuk-hint">
                      It’s on your National Health card, benefit letter, payslip or P60.
                    </div>
                    <input
                      className="govuk-input govuk-input--width-10 govuk-input--extra-letter-spacing"
                      id="national-insurance-number"
                      name="NHSNumber"
                      onChange={handleChange}
                      type="text"
                      spellCheck="false"
                      aria-describedby="national-insurance-number-hint"
                    />
                  </div>

                  <div className="govuk-form-group">
                  <label className="govuk-label" htmlFor="password">Password</label>
                  <input
                    className="govuk-input govuk-!-width-three-quarters"
                    id="password"
                    name="Password"
                    onChange={handleChange}
                    type="password"
                    spellCheck="false"
                    autoComplete="password"
                  />
                </div>
                  <button type="submit" className="govuk-button" data-module="govuk-button">Continue</button>
                  </form>
                </>
              )}

              {registerMethod === "no" && (
                <>
                  <form onSubmit={handleSumbitAlt}>
                  <fieldset className="govuk-fieldset">
                    <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
                      <h1 className="govuk-fieldset__heading">Alternate Details</h1>
                    </legend>
                    <div className="govuk-form-group">
                      <label className="govuk-label" htmlFor="first-name">First Name</label>
                      <input
                        className="govuk-input govuk-!-width-three-quarters"
                        id="first-name"
                        name="Forename"
                        onChange={handleChangeAlt}
                        type="text"
                        autoComplete="first-name"
                      />
                    </div>
                    <div className="govuk-form-group">
                      <label className="govuk-label" htmlFor="last-name">Surname</label>
                      <input
                        className="govuk-input govuk-!-width-three-quarters"
                        id="last-name"
                        name="Surname"
                        onChange={handleChangeAlt}
                        type="text"
                        autoComplete="last-name"
                      />
                    </div>
                    <div className="govuk-form-group">
                      <label className="govuk-label" htmlFor="address-postcode">Postcode</label>
                      <input
                        className="govuk-input govuk-input--width-10"
                        id="address-postcode"
                        name="PostCode"
                        onChange={handleChangeAlt}
                        type="text"
                        autoComplete="postal-code"
                      />
                    </div>

                    <div className="govuk-form-group">
                  <label className="govuk-label" htmlFor="password">Password</label>
                  <input
                    className="govuk-input govuk-!-width-three-quarters"
                    id="password"
                    name="Password"
                    onChange={handleChangeAlt}
                    type="password"
                    spellCheck="false"
                    autoComplete="password"
                  />
                </div>
                  </fieldset>
                  <button type="submit" className="govuk-button" data-module="govuk-button">Continue</button>
                  </form>
                </>
              )}

              {/* <form onSubmit={handleSumbit}>
                <button type="submit" className="govuk-button" data-module="govuk-button">Continue</button>
              </form> */}


              <h2 className="govuk-heading-m">Current users of GP Services</h2>
              <div className="govuk-body"><a className="govuk-link" id="no-account" href="/login">Sign in to your account</a>
              </div>
            </div>
          </div>

        </main>
      </div>

    </>
  );
}

export default Register;