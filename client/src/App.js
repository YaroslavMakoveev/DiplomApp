import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomeScreen from './pages/HomeScreen';
import LoginScreen from './pages/LoginScreen';
import ForgotPasswordScreen from './pages/ForgotPasswordScreen';
import ResetPasswordScreen from './pages/ResetPasswordScreen';
import Profile from './pages/Profile';
import AdminScreen from './pages/AdminScreen';
import AdminCheck from './middleware/AdminCheck';


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
          <Route path='/profile' element={<Profile />} />
          <Route path='/admin' element={
            <AdminCheck>
              <AdminScreen />
            </AdminCheck>
          } />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
