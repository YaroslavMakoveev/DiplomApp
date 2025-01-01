import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomeScreen from './pages/HomePage';
import LoginScreen from './pages/LoginScreen';
import ForgotPasswordScreen from './pages/ForgotPasswordScreen';
import ResetPasswordScreen from './pages/ResetPasswordScreen';

function App() {
  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/forgot-password' element={<ForgotPasswordScreen />} />
          <Route path='/reset-password/:token' element={<ResetPasswordScreen />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
