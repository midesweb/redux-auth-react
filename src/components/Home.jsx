import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/user-slice';
import { Link } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();
  const { loggedIn, userData } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!loggedIn) {
    return (
      <div>
        <h2>Bienvenido</h2>
        <Link to="/login">Iniciar Sesión</Link>
        <br />
        <Link to="/register">Registrarse</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Hola, {userData.email}</h2>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
}

export default Home;
