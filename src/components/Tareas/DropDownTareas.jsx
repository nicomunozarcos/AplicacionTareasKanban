import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { TareasContext } from '../Interfaz/TareasContext';

export function DropdownTareas() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [tableros, setTableros] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [tableroABorrar, setTableroABorrar] = useState(null);
  const { actualizarTareas, diasRestantes, actualizarDiasRestantes } = useContext(TareasContext);
  const [tableroSeleccionado, setTableroSeleccionado] = useState(null);

  const cambioDias = (e) => {
    const nuevoValor = parseInt(e.target.value);
    actualizarDiasRestantes(nuevoValor);
  };


  useEffect(() => {
    console.log("Tableros: ", tableros);
    if (tableros.length > 0) {
      const tableroSeleccionadoLocalStorage = localStorage.getItem('tableroSeleccionado');
      if (tableroSeleccionadoLocalStorage) {
        const tablero = tableros.find((tablero) => tablero.TT_ID.toString() === tableroSeleccionadoLocalStorage);
        if (tablero) {
          setTableroSeleccionado(tablero);
        } else {
          setTableroSeleccionado(tableros[0]);
          actualizarTareas(tableros[0]);
        }
      }
    }
  }, [tableros, actualizarTareas]);

  const toggleDropdown = () => {
    setIsOpenSetting(!isOpenSetting);
  };


  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const fetchTableros = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userId = userData.ID;
  
    fetch(`http://localhost:3000/api/tableros-tareas/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setTableros(data);
        const primerTablero = data[0];
        setTableroSeleccionado(primerTablero);
        actualizarTareas(primerTablero);
      })
      .catch((error) => console.error('Error:', error));
  };

  useEffect(() => {
    fetchTableros();
  }, [fetchTableros]);

  const handleCrearTablero = () => {
    const nombreTablero = window.prompt('Ingrese el nombre del tablero:');
    if (nombreTablero) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const userId = userData.ID;

      fetch(`http://localhost:3000/api/tableros-tareas/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombreTablero }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          fetchTableros();
        })
        .catch((error) => console.error('Error:', error));
    }
  };

  const handleClickTablero = (tablero) => {
    setTableroSeleccionado(tablero);
    localStorage.setItem('tableroSeleccionado', tablero.TT_ID.toString());
    actualizarTareas(tablero);
    setTableroABorrar(null);
  };

  const handleBorrarTablero = (tablero) => {
    setTableroABorrar(tablero);
    setShowConfirmation(true);
  };

  const eliminarTareasDelTablero = (tablero) => {
    fetch(`http://localhost:3000/api/tareas/tablero/${tablero.TT_ID}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error('Error:', error))
      .finally(() => {
        borrarTablero(tablero);
      });
  };

  const borrarTablero = (tablero) => {
    fetch(`http://localhost:3000/api/tableros-tareas/${tablero.TT_ID}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchTableros();
      })
      .catch((error) => console.error('Error:', error))
      .finally(() => {
        handleClickTablero(tableros[0])
      });
  };

  return (
    <>
    <div className={`dropdown-container ${showConfirmation ? 'show-confirmation' : ''}`}>
      <div className="dropdown1">
        <button
          className={`btn btn-secondary btn-sm dropdown-toggle mx-2 pt-0 pb-0 mb-2 ${isOpen ? 'show' : ''}`}
          type="button"
          onClick={handleToggle}
        >
          Tableros de Tareas
        </button>
        {tableroSeleccionado && (
          <h5 className="tablero-activo pb-0 mb-0 pt-0 mt-0">: {tableroSeleccionado.TT_NOMBRE}</h5>
        )}
        {isOpen && (
          <ul className="dropdown-menu dropdown-menu-dark arribaZ show">
            {tableros.map((tablero, index) => (
              <li key={index}>
                <div className="tablero-item">
                  <Link className="dropdown-item drptext" onClick={() => handleClickTablero(tablero)}>
                    {tablero.TT_NOMBRE}
                  </Link>
                  <button className="borrar-tablero" onClick={() => handleBorrarTablero(tablero)}>
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
            <p>
              ¿Estás seguro de que deseas borrar el tablero {tableroABorrar && tableroABorrar.TT_NOMBRE}?
            </p>
            <button
              className="btn btn-danger btn-sm mx-2"
              onClick={() => {
                setShowConfirmation(false);
                eliminarTareasDelTablero(tableroABorrar);
              }}
            >
              Sí
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => setShowConfirmation(false)}>
              No
            </button>
          </div>
        )}
      </div>
      <div className="dropdown-container2 mx-3 px-1">
          <div className="dropdown2">
            <button               className={`btn btn-secondary btn-sm dropdown-toggle mx-3 pt-0 pb-0 ${isOpenSetting ? 'show' : ''}`}
              type="button"
              onClick={toggleDropdown}>
            </button>
            <ul className={`dropdown-menu dropdown-menu-dark arribaZ drptext4 ${isOpenSetting ? 'show' : ''}`} style={{ right: isOpenSetting ? '0' : '-100%' }}>
              <li>
                <div className="dropdown-item pb-0">
                  <div htmlFor="daysInput" className="form-label">Las tareas se marcan automaticamente </div>
                  <div htmlFor="daysInput" className="form-label"> como urgentes cuando quedan:                  
                   <input
                    id="daysInput"
                    type="number"
                    className=" input-small"
                    value={diasRestantes}
                    onChange={(e) => cambioDias(parseInt(e.target.value))}
                  /> días </div>
                </div>
              </li>
              <li><hr className="dropdown-divider pt-0"></hr></li>
              <li></li>
            </ul>
          </div>
        </div>
    </div>
    </>
    
  );
}
