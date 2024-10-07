import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../redux/user-slice';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginValidationErrors, loggedIn } = useSelector((state) => state.user);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(form));
  };

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Correo electrónico"
      />
      {loginValidationErrors?.email &&
          loginValidationErrors.email.map((error, index) => (
            <div key={`email-error-${index}`} className="error-message">
              {error}
            </div>
          ))}

      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Contraseña"
      />
      {loginValidationErrors?.password &&
          loginValidationErrors.password.map((error, index) => (
            <div key={`password-error-${index}`} className="error-message">
              {error}
            </div>
          ))}

      <button type="submit">Iniciar Sesión</button>
     
      <p>
        ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </form>
    
  );
}

export default Login;
