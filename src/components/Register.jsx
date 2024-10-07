import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../redux/user-slice';
import { Link, useNavigate } from 'react-router-dom';
import {  } from 'react-router-dom';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { registerValidationErrors, loggedIn } = useSelector((state) => state.user);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp(form));
  };

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  return (
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        {/* Campo Nombre */}
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre completo"
        />
        {registerValidationErrors?.name &&
          registerValidationErrors.name.map((error, index) => (
            <div key={`name-error-${index}`} className="error-message">
              {error}
            </div>
          ))}

        {/* Campo Email */}
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
        />
        {registerValidationErrors?.email &&
          registerValidationErrors.email.map((error, index) => (
            <div key={`email-error-${index}`} className="error-message">
              {error}
            </div>
          ))}

        {/* Campo Contraseña */}
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Contraseña"
        />
        {registerValidationErrors?.password &&
          registerValidationErrors.password.map((error, index) => (
            <div key={`password-error-${index}`} className="error-message">
              {error}
            </div>
          ))}

        <button type="submit">Crear Cuenta</button>
      </form>

      <p>
        ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
}

export default Register;