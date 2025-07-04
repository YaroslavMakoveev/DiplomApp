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
import OurAthletsPage from './pages/OurAthlets';
import NewsPage from './pages/NewsPage';
import AthleteProfile from './pages/AthleteProfileScreen';
import EditUserAdminScreen from './components/ADMIN/EditUserAdminScreen';


function App() {
  return (
    <>
      <Router>
      <NavBar />
        <Routes>
          <Route path='/news' element={<NewsPage />} />
          <Route path='/' element={<HomeScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/forgot-password' element={<ForgotPasswordScreen />} />
          <Route path='/reset-password/:token' element={<ResetPasswordScreen />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/our-athlets' element={<OurAthletsPage />} />
          <Route path='/athlete/:id' element={<AthleteProfile />} />
          <Route path="/admin/edit-user/:id" element={
            <AdminCheck>
              <EditUserAdminScreen />
            </AdminCheck>  
          } />
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
