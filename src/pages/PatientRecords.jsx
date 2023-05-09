import axios from "axios";
import { useEffect, useState } from "react";

function PatientRecords() {
  const API_PATH = 'http://localhost:8000/api_in_core_php/api/new/userdata.php';

  const [user, setUser] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  function getUserData(){
    axios.post(API_PATH, {
      NHSNumber: localStorage.getItem('NHSNumber')
    }).then(function (response) {
      if (response.data.message !== 'Server Error') {
        // when data is present
        //console.log(response.data)
        setUser(response.data);
      }
      else {
        //error handling goes here
        console.log(response.data.message)
      }
    })
  }
  

  return (
    <>
      <div className="govuk-width-container ">
        <a href="/appointments" className="govuk-back-link">Back</a>
        <main className="govuk-main-wrapper " id="main-content" role="main">
          <h1 className="govuk-heading-xl">Your Medical Records</h1>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds-from-desktop">
              <h2 className="govuk-heading-m">Personal details</h2>
              <dl className="govuk-summary-list govuk-!-margin-bottom-9">
              {user.map((useri) => (
                <>
              <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">NI Number</dt>
                  <dd className="govuk-summary-list__value">{useri.NHSNumber}</dd>
                  <dd className="govuk-summary-list__actions">
                    <a className="govuk-link" href="/editpatientrecord">
                      Change
                      <span className="govuk-visually-hidden">
                        {" "}
                        NI Number
                      </span>
                    </a>
                  </dd>
                </div>
                

                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Forename</dt>
                  <dd className="govuk-summary-list__value">{useri.Forename}</dd>
                  <dd className="govuk-summary-list__actions">
                    <a className="govuk-link" href="/editpatientrecord">
                      Change<span className="govuk-visually-hidden"> forename</span>
                    </a>
                  </dd>
                </div>

                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Surname</dt>
                  <dd className="govuk-summary-list__value">{useri.Surname}</dd>
                  <dd className="govuk-summary-list__actions">
                    <a className="govuk-link" href="/editpatientrecord">
                      Change<span className="govuk-visually-hidden"> surname</span>
                    </a>
                  </dd>
                </div>

                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Date of birth</dt>
                  <dd className="govuk-summary-list__value">{useri.PersoneDOB}</dd>
                  <dd className="govuk-summary-list__actions">
                    <a className="govuk-link" href="/editpatientrecord">
                      Change
                      <span className="govuk-visually-hidden"> date of birth</span>
                    </a>
                  </dd>
                </div>

                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Gender</dt>
                  <dd className="govuk-summary-list__value">{useri.GenderCode}</dd>
                  <dd className="govuk-summary-list__actions">
                    <a className="govuk-link" href="/editpatientrecord">
                      Change
                      <span className="govuk-visually-hidden"> gender</span>
                    </a>
                  </dd>
                </div>

                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Blood Group</dt>
                  <dd className="govuk-summary-list__value">{useri.Bloodgroup}</dd>
                  <dd className="govuk-summary-list__actions">
                    <a className="govuk-link" href="/editpatientrecord">
                      Change
                      <span className="govuk-visually-hidden"> bloodgroup</span>
                    </a>
                  </dd>
                </div>

                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Postcode</dt>
                  <dd className="govuk-summary-list__value">
                  {useri.Postcode}
                  </dd>
                  <dd className="govuk-summary-list__actions">
                    <a className="govuk-link" href="/editpatientrecord">
                      Change<span className="govuk-visually-hidden"> postcode</span>
                    </a>
                  </dd>
                </div>
                </>
                ))}

              </dl>

                <a href='/deleteconfirmation' className="govuk-button govuk-button--warning" data-module="govuk-button">Delete account</a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default PatientRecords;