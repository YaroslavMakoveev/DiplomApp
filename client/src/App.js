import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import NavBar from './components/NavBar';
import HomeScreen from './pages/HomePage';
import LoginScreen from './pages/LoginScreen';

function App() {
  return (
    <>
    <NavBar />
    <Router>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/login' element={<LoginScreen />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
