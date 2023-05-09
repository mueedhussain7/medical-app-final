import { useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

function EditPatientRecord() {
    const API_PATH = 'http://localhost:8000/api_in_core_php/api/new/confirmedappointment.php';
    const API_PATH_CANCEL = 'http://localhost:8000/api_in_core_php/api/new/cancelappointment.php';
  
    const navigate = useNavigate()

    const [confirmation, setConfirmation] = useState([]);

    useEffect(() => {
        getConfirmation();
      }, []);
  
      function getConfirmation(){
        axios.post(API_PATH,{
            NHSNumber: localStorage.getItem('NHSNumber'),
          }).then(function (response) {
          if (response.data.message !== 'Server Error') {
            // when data is present
            //console.log(response.data)
            setConfirmation(response.data);
          }
          else {
            //error handling goes here
            console.log(response.data.message)
          }
        })
      }

    const handleSumbit = (e) => {
           e.preventDefault();

           axios.post(API_PATH_CANCEL,{
            NHSNumber: localStorage.getItem('NHSNumber'),
          }).then(function (response) {
            if (response.data.message === 'Appointment cancelled!') {
              navigate('/appointments');
            }
            else {
              //error handling goes here
              console.log(response.data.message)
            }
        })

        //    localStorage.removeItem('Appointment Date');
        //    localStorage.removeItem('Appointment Time');
        //     navigate('/appointments')
        }
      
    return (
        <>
            <div className="govuk-width-container">
            <a href="/appointments" className="govuk-back-link">Back</a>
                <main className="govuk-main-wrapper govuk-main-wrapper--l" id="main-content" role="main">
                    <div className="govuk-grid-row">
                        <div className="govuk-grid-column-two-thirds">
                            <div className="govuk-panel govuk-panel--confirmation">
                                <h1 className="govuk-panel__title">Appointment confirmed</h1>
                                {confirmation.map((item) => (
                                <div className="govuk-panel__body">
                                    Appointment Details
                                    <br />
                                    <p><strong>{item.date}</strong>
                                        <br />
                                        {item.time}</p>
                                </div>
                                ))}
                            </div>
                            <p className="govuk-body">We have sent you a confirmation email.</p>
                            <h2 className="govuk-heading-m">What to do next</h2>
                            <p className="govuk-body">
                                Save this booking confirmation to show it when you visit for your appointment.
                            </p>
                            <p className="govuk-body">
                                You can contact the GP for more information.
                            </p>
                            <h2 className="govuk-heading-m">Want to cancel your appointment?</h2>
                            <form onSubmit={handleSumbit}>
                            <button className="govuk-button govuk-button--warning" data-module="govuk-button">Cancel appointment</button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>

        </>
    )
}

export default EditPatientRecord;