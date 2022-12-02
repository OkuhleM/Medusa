import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import isSignedIn from './Components/isSignedIn'
import LandingPage from './Components/LandingPage';
import LogOut from './Components/LogOut';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/logout' element={<LogOut />} />
          <Route path="/issignedin" element={<isSignedIn />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
