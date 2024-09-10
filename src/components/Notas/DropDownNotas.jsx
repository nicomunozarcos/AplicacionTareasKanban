import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function DropdownNotas() {
  const [isOpen, setIsOpen] = useState(false);
  const [tableros, setTableros] = useState([]);
  const [tableroSeleccionado, setTableroSeleccionado] = useState(null);
  const [notasTableroSeleccionado, setNotasTableroSeleccionado] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [tableroABorrar, setTableroABorrar] = useState(null);

  console.log(tableroSeleccionado);
  console.log(notasTableroSeleccionado);

  useEffect(() => {
    fetchTableros();
  }, []);

  useEffect(() => {
    const tableroSeleccionadoLocalStorage = localStorage.getItem('tableroSeleccionado');
    if (tableros.length > 0) {
      if (tableroSeleccionadoLocalStorage) {
        const tablero = tableros.find(tablero => tablero.TN_ID.toString() === tableroSeleccionadoLocalStorage);
        if (tablero) {
          setTableroSeleccionado(tablero);
        } else {
          setTableroSeleccionado(tableros[0]);
        }
      } else {
        setTableroSeleccionado(tableros[0]);
      }
    }
  }, [tableros]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const fetchTableros = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userId = userData.ID;

    fetch(`http://localhost:3000/api/tableros-notas/${userId}`)
      .then(response => response.json())
      .then(data => setTableros(data))
      .catch(error => console.error('Error:', error));
  };

  const fetchNotasTablero = () => {
    const tableroId = tableroSeleccionado.TN_ID;

    fetch(`http://localhost:3000/api/notas/${tableroId}`)
      .then(response => response.json())
      .then(data => {
        setNotasTableroSeleccionado(data);
        localStorage.setItem('notasTableroSeleccionado', JSON.stringify(data));
      })
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    if (tableroSeleccionado !== null) {
      fetchNotasTablero();
    }
  }, [tableroSeleccionado]);

  const handleCrearTablero = () => {
    const nombreTablero = window.prompt('Ingrese el nombre del tablero:');
    if (nombreTablero) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const userId = userData.ID;

      fetch(`http://localhost:3000/api/tableros-notas/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombreTablero })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          fetchTableros();
        })
        .catch(error => console.error('Error:', error));
    }
  };

  const handleClickTablero = (tablero) => {
    setTableroSeleccionado(tablero);
    localStorage.setItem('tableroSeleccionado', tablero.TN_ID.toString());
    fetchNotasTablero(tablero.TN_ID);
    setTableroABorrar(null);
  };

  const handleBorrarTablero = (tablero) => {
    setTableroABorrar(tablero);
    setShowConfirmation(true);
  };

  const borrarTablero = (tablero) => {
    fetch(`http://localhost:3000/api/tableros-notas/${tablero.TN_ID}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        fetchTableros();
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className={`dropdown-container ${showConfirmation ? 'show-confirmation' : ''}`}>
      <div className="dropdown1">
        <button
          className={`btn btn-secondary btn-sm dropdown-toggle mx-2 pt-0 pb-0 mb-2 ${isOpen ? 'show' : ''}`}
          type="button"
          onClick={handleToggle}
        >
          Tableros de Notas
        </button>
        {tableroSeleccionado && (
          <h5 className="tablero-activo verdeclarito pb-0 mb-0 pt-0 mt-0">: {tableroSeleccionado.TN_NOMBRE}</h5>
        )}
        {isOpen && (
          <ul className="dropdown-menu dropdown-menu-dark arribaZ show">
            {tableros.map((tablero, index) => (
              <li key={index}>
                <div className="tablero-item">
                  <Link
                    className="dropdown-item drptext"
                    onClick={() => handleClickTablero(tablero)}
                  >
                    {tablero.TN_NOMBRE}
                  </Link>
                  <button
                    className="borrar-tablero"
                    onClick={() => handleBorrarTablero(tablero)}
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
            <li>
              <hr className="dropdown-divider my-2" />
            </li>
            <li>
              <button
                type="button"
                className="btn btn-outline-success mt-0 btncreartablero mx-4"
                onClick={handleCrearTablero}
              >
                Crear tablero
              </button>
            </li>
          </ul>
        )}
        {showConfirmation && (
          <div className="alerta-confirmacion">
            <p>¿Estás seguro de que deseas borrar el tablero {tableroABorrar && tableroABorrar.TN_NOMBRE}?</p>
            <button
              className="btn btn-danger btn-sm mx-2"
              onClick={() => {
                setShowConfirmation(false);
                borrarTablero(tableroABorrar);
              }}
            >
              Sí
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setShowConfirmation(false)}
            >
              No
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
