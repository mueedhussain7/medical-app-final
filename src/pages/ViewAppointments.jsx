import { useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import appointments from '../data/appointments.json'

function ViewAppointments() {
  const API_PATH = 'http://localhost:8000/api_in_core_php/api/new/availableappointments.php';
  const API_PATH_BOOK = 'http://localhost:8000/api_in_core_php/api/new/bookappointment.php';

  const [appointment, setAppointments] = useState([]);

  const navigate = useNavigate();

  const [selectedTile, setSelectedTile] = useState(null);

  const handleTileSelect = (date, time) => {
    setSelectedTile({ date, time });
  };

  const handleSubmit = () => {
    if (selectedTile) {
      // Perform the submit logic with the selected tile
      axios.post(API_PATH_BOOK,{
        NHSNumber: localStorage.getItem('NHSNumber'),
        time: selectedTile.time,
        date: selectedTile.date
      }).then(function (response) {
        if (response.data.message === 'Appointment added!') {
          // when data is present
          //console.log(response.data)
          setSelectedTile(null);
          navigate('/appointmentconfirmation');
        }
        else {
          //error handling goes here
          console.log(response.data.message)
        }
      })
      // localStorage.setItem('Appointment Date', selectedTile.date)
      // localStorage.setItem('Appointment Time', selectedTile.time)
      // Reset the selected tile after submission
      // setSelectedTile(null);
      // navigate('/appointmentconfirmation');
    }
  };

    useEffect(() => {
      getAppointments();
    }, []);

    function getAppointments(){
      axios.get(API_PATH).then(function (response) {
        if (response.data.message !== 'Server Error') {
          // when data is present
          //console.log(response.data)
          setAppointments(response.data);
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
          <h1 className="govuk-heading-xl">All Appointments</h1>

          <div className="govuk-form-group tile-container">
          {appointment.map((item) => (
            <Tile
              key={item.id}
              date={item.date}
              time={item.time}
              selected={selectedTile && selectedTile.date === item.date && selectedTile.time === item.time}
              onSelect={handleTileSelect}
            />
            ))}
          </div>
          <button data-prevent-double-click="true" className="govuk-button" data-module="govuk-button" disabled={!selectedTile} onClick={handleSubmit}>
          Confirm and book
          </button>
        </main>
      </div>
      </>
    )}

    const Tile = ({ date, time, selected, onSelect }) => {

    const clickHandler = () => {
      onSelect(date, time);
  };
      return (
        <div className={`tile ${selected ? 'selected' : ''}`} onClick={clickHandler}>
          <h3 className="govuk-heading-s">{date}</h3>
          <p className="govuk-body">{time}</p>
        </div>
      );
    };

export default ViewAppointments;