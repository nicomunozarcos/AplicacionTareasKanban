import React, { createContext, useState, useEffect } from 'react';

export const TareasContext = createContext();

export const TareasProvider = ({ children }) => {
  const [tareas, setTareas] = useState([]);
  const [tableroId, setTableroId] = useState('');
  const [diasRestantes, setDiasRestantes] = useState(2);

  useEffect(() => {
    const storedTableroId = localStorage.getItem('tableroSeleccionado');
    if (storedTableroId) {
      setTableroId(storedTableroId);
    }
  }, []);

  const actualizarTareas = async (nuevoTableroId) => {
    if (nuevoTableroId) {
      try {
        const response = await fetch(`https://back-tareas.vercel.app/api/tareas/${nuevoTableroId}`);
        if (response.ok) {
          const data = await response.json();
          // Solo actualizamos si las tareas realmente han cambiado
          if (JSON.stringify(data) !== JSON.stringify(tareas)) {
            setTareas(data);
            localStorage.setItem('tareasTableroSeleccionado', JSON.stringify(data));
          }
        } else {
          console.error('Error al actualizar las tareas:', response.statusText);
        }
      } catch (error) {
        console.error('Error al actualizar las tareas:', error);
      }
    }
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
