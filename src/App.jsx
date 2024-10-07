import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { registerToken, getUser, initialized } from './redux/user-slice';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Feedback from './components/Feedback';
import './components/utils/ra-feedback'
import './components/utils/ra-loading'

function App() {
  const dispatch = useDispatch();
  const { initialized: isInitialized } = useSelector((state) => state.user);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      dispatch(registerToken(token));
      dispatch(getUser());
    } else {
      dispatch(initialized());
    }
  }, [dispatch]);

  if (!isInitialized) {
    return <div>Cargando...<ra-loading></ra-loading></div>;
  }

  return (
    <>
      <header>
        <h1>Mi Aplicación</h1>
      </header>
      <Feedback />
      <div className="container">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
      <footer>
        © 2024 Mi Aplicación
      </footer>
      <ra-feedback></ra-feedback>
      <ra-loading></ra-loading>
    </>
  );
}

export default App;
