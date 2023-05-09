import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

//Importing Components
import Header from './components/Header';
import Footer from './components/Footer';
import Protected from './components/Protected';
import ReRoute from './components/ReRoute';

//Importing Pages
import Home from './pages/Home';
import Select from './pages/Select'
import Register from './pages/Register'
import Login from './pages/Login'
import Logout from './pages/Logout';
import Appointments from './pages/Appointments'
import ViewAppointments from './pages/ViewAppointments'
import AppointmentConfirmation from './pages/AppointmentConfirmation'
import PatientRecords from './pages/PatientRecords'
import EditPatientRecord from './pages/EditPatientRecord'
import DeleteConfirmation from './pages/DeleteConfirmation'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<ReRoute><Home/></ReRoute>} />
        <Route path='select' element={<ReRoute><Select/></ReRoute>}/>
        <Route path='/register' element={<ReRoute><Register/></ReRoute>} />
        <Route path='/login' element={<ReRoute><Login/></ReRoute>} />
        <Route path='/logout' Component={Logout} />
        <Route path='/appointments' element={<Protected><Appointments/></Protected>} />
        <Route path='/viewappointments' element={<Protected><ViewAppointments/></Protected>} />
        <Route path='/appointmentconfirmation' element={<Protected><AppointmentConfirmation/></Protected>} />
        <Route path='/patientrecords' element={<Protected><PatientRecords/></Protected>} />
        <Route path='/editpatientrecord' element={<Protected><EditPatientRecord/></Protected>} />
        <Route path='/deleteconfirmation' element={<Protected><DeleteConfirmation/></Protected>} />
        <Route path='*' Component={NotFound} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;