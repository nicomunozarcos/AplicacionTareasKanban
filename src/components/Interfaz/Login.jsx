import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import '../../styles/login.css';
import {Footer} from '../Interfaz/Footer';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);

  const navigate = useNavigate();


  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(' http://localhost:3000/api/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("ejecutandose");

      if (response.ok) {
        navigate('/inicio');
        const data = await response.json();
        const { fullName } = data;
        const { ID } = data;
        
        const userData = {
          ID: ID,
          fullName: fullName,
          email: email,
          password: password,
        };
      
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log(userData);

      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (error) {
      // Aquí puedes manejar los errores de conexión o del servidor
      console.log(error);
    }
  };

  const handleRegister = async () => {

    if (!fullName || !email || !password) {
      alert('Todos los campos son obligatorios');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password }),
      });

      if (response.ok) {
        navigate('/inicio');
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div className="section">
      <div className="container">
        <div className="row ">
          <div className="col-6 mx-4 align-self-center mt-5 diapositivas">
            <div className={`diapositiva ${activeSlide === 0 ? 'active' : ''}`}>
              <h1 className='mb-4 pt-4'>Tareas</h1>
              <p className='pperson'>- En nuestra página web, puedes gestionar tus tareas de manera eficiente.</p>
              <p className='pperson'>- Organiza tus tareas por fecha, prioridad o categoría.</p>
              <p className='pperson'>- Marca las tareas completadas y mantén un seguimiento de tu progreso.</p>
            </div>

            <div className={`diapositiva ${activeSlide === 1 ? 'active' : ''}`}>
              <h1 className='mb-4 pt-4'>Bloc de notas</h1>
              <p className='pperson'>- Además de las tareas, ofrecemos un bloc de notas integrado.</p>
              <p className='pperson'>- Toma notas rápidas, guarda ideas o anota recordatorios importantes.</p>
              <p className='pperson'>- El bloc de notas está siempre a tu alcance, sin necesidad de utilizar aplicaciones adicionales.</p>
            </div>

            <div className={`diapositiva ${activeSlide === 2 ? 'active' : ''}`} >
              <h2 className='mb-4 pt-4'>Organización de departamentos</h2>
              <p className='pperson2'>- Facilitamos la colaboración en equipo mediante la opción de organizar grupos de trabajo.</p>
              <p className='pperson2'>- Crea un grupo, invita a tus compañeros y compartan tareas, notas y archivos.</p>
              <p className='pperson2'>- Trabajen juntos de manera eficiente y manténganse actualizados.</p>
            </div>

             <div className="botones-diapositivas">
              {[0, 1, 2].map((index) => (
                <button
                    key={index}
                    className={`boton-diapositiva ${activeSlide === index ? 'active' : ''}`}
                    onClick={() => handleSlideChange(index)}
                ></button>
                ))}
            </div>
          </div>
          <div className="col-4 text-center align-self-center py-4 mt-3">
            <div className="section pb-5 text-center posicionado">
              <h6 className="mb-0 pb-3 ">
                <span>Iniciar sesión </span>
                <span>Registrarse</span>
              </h6>
              <input
                className="checkbox"
                type="checkbox"
                id="reg-log"
                name="reg-log"
              />
              <label htmlFor="reg-log" />
              <div className="card-3d-wrap mx-auto mt-5">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Iniciar sesión</h4>
                        <div className="form-group">
                          <input
                            type="email"
                            name="logemail"
                            className="form-style"
                            placeholder="Tu email"
                            id="logemail"
                            autoComplete="off"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <i className="input-icon uil uil-at" />
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="logpass"
                            className="form-style"
                            placeholder="Tu contraseña"
                            id="logpass"
                            autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <i className="input-icon uil uil-lock-alt" />
                        </div>
                        <button className="btnlogin mt-4" onClick={handleLogin}>Entrar</button>
                        <p className="mb-0 mt-4 text-center">
                          <a href="#0" className="link">
                            ¿Olvidaste tu contraseña?
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Registrarse</h4>
                        <div className="form-group">
                          <input
                            type="text"
                            name="logname"
                            className="form-style"
                            placeholder="Tu nombre completo"
                            id="logname"
                            autoComplete="off"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                          />
                          <i className="input-icon uil uil-user" />
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="email"
                            name="logemail"
                            className="form-style"
                            placeholder="Tu email"
                            id="logemail1"
                            autoComplete="off"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <i className="input-icon uil uil-at" />
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="logpass"
                            className="form-style"
                            placeholder="Tu contraseña"
                            id="logpass1"
                            autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <i className="input-icon uil uil-lock-alt" />
                        </div>
                        <button
                          className="btnlogin mt-4"
                          onClick={handleRegister}
                        >
                          Registrarse
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};