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
    if (id && !isFetching) {  // Si ya estamos fetchando, no volvemos a hacerlo
      setIsFetching(true); // Marcar que estamos haciendo la solicitud
      try {
        console.log(`Fetching tareas for tableroId: ${id}`);
        const response = await fetch(`https://back-tareas.vercel.app/api/tareas/${id}`);
        if (response.ok) {
          const data = await response.json();
          setTareas(data);
          localStorage.setItem('tareasTableroSeleccionado', JSON.stringify(data));
        }
      } catch (error) {
        console.error('Error al actualizar las tareas:', error);
      } finally {
        setIsFetching(false); // Marcar que la solicitud ha finalizado
      }
    }
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