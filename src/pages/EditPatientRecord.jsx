/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditPatientRecord() {

  const API_PATH = 'http://localhost:8000/api_in_core_php/api/new/edituser.php';
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});
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

  const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setInputs(values => ({...values,[name]: value}));
  };

  const handleSumbit = (e) => {
      e.preventDefault();

      axios.post(API_PATH,{
        NHSNumber: localStorage.getItem('NHSNumber'),
        Postcode: inputs.Postcode
      }).then(function(response){
        if(response.data.message === 'Patients updated!'){

          navigate('/patientrecords');
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
          <a href="/patientrecords" className="govuk-back-link">Back</a>
          <main className="govuk-main-wrapper " id="main-content" role="main">
            <h1 className="govuk-heading-xl">Edit GP Record</h1>

            {errorDiv}

            <form onSubmit={handleSumbit}>

              <fieldset className="govuk-fieldset">
                <div className="govuk-form-group">
                  <label className="govuk-label" htmlFor="address-postcode">
                    Postcode
                  </label>
                  <input
                    className="govuk-input govuk-input--width-10"
                    id="address-postcode"
                    name="Postcode"
                    type="text"
                    autoComplete="postal-code"
                    onChange={handleChange}
                  />
                </div>
              </fieldset>


              <button data-prevent-double-click="true" className="govuk-button" data-module="govuk-button">
                Confirm and send
              </button>
            </form>
          </main>
        </div>
      </>
    )}

export default EditPatientRecord;