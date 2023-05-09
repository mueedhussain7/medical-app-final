/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const API_PATH = 'http://localhost:8000/api_in_core_php/api/new/login.php';
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

      axios.post(API_PATH, inputs).then(function(response){
        if(response.data.message === 'Logged in successfully !'){
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('NHSNumber', response.data.data.NHSNumber)
          navigate('/appointments');
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
        <a href='/select' className="govuk-back-link">Back</a>
        <main className="govuk-main-wrapper " id="main-content" role="main">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
                
              <h1 className="govuk-heading-xl">Login using your National Health number and the password you created</h1>

              {errorDiv}

              <form onSubmit={handleSumbit}>
                <div className="govuk-form-group">
                  <label className="govuk-label" htmlFor="ninumber">National Health number</label>
                  <div id="ninumber-hint" className="govuk-hint">
                    It’s on your National Health card, benefit letter, payslip or P60.
                  </div>
                  <input
                    className="govuk-input govuk-input--width-10 govuk-input--extra-letter-spacing"
                    id="ninumber"
                    name="NHSNumber"
                    onChange={handleChange}
                    type="text"
                    spellCheck="false"
                    aria-describedby="ninumber-hint"
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

                <button className="govuk-button" data-module="govuk-button">Sign in</button>
              </form>

              <h2 className="govuk-heading-m">New users of GP Services</h2>
              <div className="govuk-body"><a className="govuk-link" id="no-account" href="/register">Create sign in details</a>
              </div>
            </div>
          </div>

        </main>
      </div>
    </>
  );
}

export default Login;