import './App.css';
import NavBar from './pages/navBar';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TrackPage from './pages/track';
import Dashboard from "./pages/dashboard";
import MonthlySurvey from './pages/monthlySurvey';
import Login from "./pages/login/login"
import Logout from './pages/logout';
import PasswordReset from './pages/login/passwordReset';
import useToken from './utils/useToken'


function App() {

  const { token, setToken } = useToken();

  if (!token) {
    return (
      <>
        <Router>
          <Routes forceRefresh={true}>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/" element={<Navigate replace to="/login" />}></Route>
            <Route path="/password-reset" element={<PasswordReset/>}></Route>
          </Routes>
        </Router>
      </>
    )
  }
  else {
    return (
      <>
        <div>
          <Router>
            <NavBar/>
            <Routes>
              <Route path="/login" element={<Navigate replace to="/dashboard" />}></Route>
              <Route path="/" element={<Navigate replace to="/dashboard" />}></Route>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/track" element={<TrackPage />} />
              <Route path="/monthly-survey" element={<MonthlySurvey />}></Route>
              <Route path="/logout" element={<Logout setToken={setToken}/>}></Route>
            </Routes>
          </Router>
        </div>
      </>
    );
  }
}

export default App;
