import axios from "axios";
import React, { useState, useEffect } from "react";

function Appointments() {
  const API_PATH = 'http://localhost:8000/api_in_core_php/api/new/confirmedappointment.php';

  const [bookedAppointment, setBookedAppointment] = useState('');

    useEffect(() => {
        getConfirmation();
      }, []);
  
      function getConfirmation(){
        axios.post(API_PATH,{
            NHSNumber: localStorage.getItem('NHSNumber'),
          }).then(function (response) {
          if (response.data.message !== 'Server Error') {
            // when data is present
            console.log(response)
            setBookedAppointment('yes');
          }
          else {
            //error handling goes here
            setBookedAppointment('no');
            console.log(response.data.message)
          }
        })
      }

  return (
    <>
      <div className="govuk-width-container ">
        <main className="govuk-main-wrapper " id="main-content" role="main">
          <h1 className="govuk-heading-xl">Patient Portal</h1>

          <div className="card-container">
          {bookedAppointment === "yes" && (
                <>
          <Card
              title="Your Booked Appointment"
              description="Click here to view booked appointment"
              link="/appointmentconfirmation"
            />
            </>
            )}
            {bookedAppointment === "no" && (
                <>
            <Card
              title="View Avaiable Appointments"
              description="Click here to view available appointments"
              link="/viewappointments"
            />
            </>
)}

            <Card
              title="View Medical Records"
              description="Click here view your medical record"
              link="/patientrecords"
            />
          </div>


          <hr className="govuk-section-break govuk-section-break--xl govuk-section-break--visible"></hr>

          <a href='/logout' role="button" className="govuk-button govuk-button--warning" data-module="govuk-button">Log Out</a>

        </main>
      </div>
    </>
  );
}

const Card = ({ title, description, link }) => {
  return (
    <div className="card">
      <h3 className="govuk-heading-m">{title}</h3>
      <p className="govuk-body"><a className="govuk-link" href={link}>{description}</a></p>
    </div>
  );
};

export default Appointments;