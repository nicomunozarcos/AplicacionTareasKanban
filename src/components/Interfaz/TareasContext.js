import React, { createContext, useState, useEffect } from 'react';

export const TareasContext = createContext();

export const TareasProvider = ({ children }) => {
  const [tareas, setTareas] = useState([]);
  const [tableroId, setTableroId] = useState('');
  const [diasRestantes, setDiasRestantes] = useState(2);
  const [isFetching, setIsFetching] = useState(false); // Estado para evitar llamadas múltiples

  useEffect(() => {
    const storedTableroId = localStorage.getItem('tableroSeleccionado');
    if (storedTableroId) {
      setTableroId(storedTableroId);
    }
  }, []);
  
  const actualizarTareas = async (nuevoTableroId) => {
    const id = nuevoTableroId || tableroId;
    
    if (!id || isFetching) return;
  
    setIsFetching(true);
    const controller = new AbortController(); // Controlador para cancelar peticiones previas
  
    try {
      const response = await fetch(`https://back-tareas.vercel.app/api/tareas/${id}`, { signal: controller.signal });
      if (response.ok) {
        const data = await response.json();
        setTareas(data);
        localStorage.setItem('tareasTableroSeleccionado', JSON.stringify(data));
      } else {
        console.error('Error al actualizar las tareas:', response.statusText);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Petición cancelada debido a cambio de tablero');
      } else {
        console.error('Error al actualizar las tareas:', error);
      }
    } finally {
      setIsFetching(false);
    }
  
    return () => controller.abort(); // Cancelar la petición anterior si se cambia el tablero
  };

  const actualizarTableroId = (nuevoId) => {
    setTableroId(nuevoId);
    localStorage.setItem('tableroSeleccionado', nuevoId);
  };
  
  
  const actualizarDiasRestantes = (nuevoValor) => {
    setDiasRestantes(nuevoValor);
  };

  const handleMoveToOptionClick = async (tareaId, columna) => {
    try {
      const response = await fetch(`https://back-tareas.vercel.app/api/tareas/${tareaId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ columna }),
      });

      if (response.ok) {
        console.log('Tarea actualizada correctamente');
        actualizarTareas();
      } else {
        console.error('Error al actualizar la tarea:', response.statusText);
      }
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  };

  const handleDeleteClick = async (tareaId) => {
    try {
      const response = await fetch(`https://back-tareas.vercel.app/api/tareas/${tareaId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Tarea eliminada correctamente');
        actualizarTareas();
      } else {
        console.error('Error al eliminar la tarea:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  return (
    <TareasContext.Provider 
      value={{ 
        tareas, 
        actualizarTareas, 
        actualizarTableroId,   // Exponer la función en el contexto
        handleMoveToOptionClick, 
        handleDeleteClick, 
        tableroId, 
        diasRestantes, 
        actualizarDiasRestantes,
        setTareas 
      }}
    >
      {children}
    </TareasContext.Provider>
  );
};