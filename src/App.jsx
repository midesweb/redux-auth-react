import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { registerToken, getUser, initialized } from './redux/user-slice';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Feedback from './components/Feedback';

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
    return <div>Cargando...</div>;
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
    </>
  );
}

export default App;
