import React, { useState } from 'react';
import "../../styles/CuadroDialogo.css";

export function CuadroDialogo({ agregarTarea, cerrarFormulario }) {
  const [nombre, setNombre] = useState('');
  const [prioridad, setPrioridad] = useState('');
  const [fechaFinalizacion, setFechaFinalizacion] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [nombreError, setNombreError] = useState('');
  const [prioridadError, setPrioridadError] = useState('');
  const [fechaFinalizacionError, setFechaFinalizacionError] = useState('');

  const obtenerFechaActual = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  const guardarTarea = () => {
    let isValid = true;
  
    if (!nombre) {
      setNombreError('Campo obligatorio');
      isValid = false;
    } else {
      setNombreError('');
    }
  
    if (!prioridad) {
      setPrioridadError('Debe seleccionar una prioridad');
      isValid = false;
    } else {
      setPrioridadError('');
    }
  
    if (fechaFinalizacion && !/^\d{2}-\d{2}-\d{4}$/.test(fechaFinalizacion)) {
      setFechaFinalizacionError('Formato incorrecto (DD-MM-AAAA)');
      isValid = false;
    } else {
      setFechaFinalizacionError('');
    }
  
    if (isValid) {
      const nuevaTarea = {
        nombre: nombre,
        prioridad: prioridad,
        fechaCreacion: obtenerFechaActual(),
        fechaFinalizacion: fechaFinalizacion,
        observaciones: observaciones
      };
      agregarTarea(nuevaTarea);
      cerrarFormulario();
    }
  };

  return (
    <div className="cuadro-dialogo-overlay">
      <div className="cuadro-dialogo">
        <input
          type="text"
          placeholder="Nombre de la tarea *"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={nombreError ? 'error' : ''}
        />
        {nombreError && <div className="error-message">{nombreError}</div>}
        <select
          value={prioridad}
          onChange={(e) => setPrioridad(e.target.value)}
          className={prioridadError ? 'error' : ''}
        >
          <option value="" disabled hidden>
            Seleccionar prioridad *
          </option>
          <option value="BAJA">Baja</option>
          <option value="MEDIA">Media</option>
          <option value="ALTA">Alta</option>
          <option value="URGENTE">Urgente</option>
        </select>
        {prioridadError && <div className="error-message">{prioridadError}</div>}
        <input
          type="text"
          placeholder="Fecha de finalización (DD-MM-AAAA)"
          value={fechaFinalizacion}
          onChange={(e) => setFechaFinalizacion(e.target.value)}
          className={fechaFinalizacionError ? 'error' : ''}
        />
        {fechaFinalizacionError && (
          <div className="error-message">{fechaFinalizacionError}</div>
        )}
        <textarea
          placeholder="Observaciones"
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
        />
        <button className="aceptar" onClick={guardarTarea}>Guardar</button>
        <button className="cancelar" onClick={cerrarFormulario}>Cancelar</button>
      </div>
    </div>
  );
}
