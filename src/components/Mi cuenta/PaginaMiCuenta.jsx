import React, { useState } from 'react';
import { NavBar } from '../Interfaz/NavBar';
import "../../index.css";
import { Footer } from '../Interfaz/Footer';

export const PaginaMiCuenta = () => {
  const [nombre, setNombre] = useState(() => {
    const storedData = localStorage.getItem('userData');
    const userData = storedData ? JSON.parse(storedData) : null;
    return userData ? userData.fullName : 'Nombre de usuario';
  });
  
  const [email, setEmail] = useState(() => {
    const storedData = localStorage.getItem('userData');
    const userData = storedData ? JSON.parse(storedData) : null;
    return userData ? userData.email : 'correo@example.com';
  });
  
  const [contraseña, setContraseña] = useState('');

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleContraseñaChange = (event) => {
    setContraseña(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const storedData = localStorage.getItem('userData');
    const userData = storedData ? JSON.parse(storedData) : null;
    const userID = userData ? userData.ID : null; // Obtener el ID del localStorage

    fetch('http://localhost:3000/api/actualizar-datos', {
      method: 'POST',
      body: JSON.stringify({ userID, nombre, email, contraseña }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Datos actualizados en la base de datos:', data);
      })
      .catch(error => {
        console.error('Error al actualizar los datos:', error);
      });
    console.log('Datos actualizados');
  };

  const handleEditClick = (field) => {
    let newValue = prompt(`Introduzca su nuevo ${field}`, field === 'Nombre' ? nombre : field === 'Email' ? email : '');
    if (newValue) {
      if (field === 'Nombre') {
        setNombre(newValue);
      } else if (field === 'Email') {
        setEmail(newValue);
      } else if (field === 'Contraseña') {
        setContraseña(newValue);
      }
    }
  }


  return (
    <>
      <NavBar />
      <div className="container mt-5 px-5 datos">
        <h3 className="grisaceoletra mx-0">Mi Cuenta</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mt-1">
            <label htmlFor="nombre">Nombre:</label>
            <div className="micuenta">
              <input
                type="text"
                className="form-control textocuenta"
                id="nombre"
                value={nombre}
                onChange={handleNombreChange}
                readOnly
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-outline-secondary botoncuenta"
                  onClick={() => handleEditClick('Nombre')}
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <label htmlFor="email">Email:</label>
            <div className="micuenta">
              <input
                type="email"
                className="form-control textocuenta"
                id="email"
                value={email}
                onChange={handleEmailChange}
                readOnly
              />
              <div>
                <button
                  type="button"
                  className="btn btn-outline-secondary botoncuenta"
                  onClick={() => handleEditClick('Email')}
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <label htmlFor="contraseña">Contraseña:</label>
            <div className="micuenta">
              <input
                type="password"
                className="form-control textocuenta"
                id="contraseña"
                value={contraseña}
                onChange={handleContraseñaChange}
              />
              <div>
                <button
                  type="button"
                  className="btn btn-outline-secondary botoncuenta"
                  onClick={() => handleEditClick('Contraseña')}
                >
                  Editar
                </button>
              </div>
            </div>
            <button type="button" className="btn btn-outline-success botonconfirm mt-5" onClick={handleSubmit}>
                  Confirmar
            </button>
          </div>
        </form>
      </div>
      <Footer />

    </>
  );
};
