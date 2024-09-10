import React, { useEffect, useContext } from 'react';
import { TareasPendientes } from './TareasPendientes';
import { TareasEnProgreso } from './TareasEnProgreso';
import { TareasAcabadas } from './TareasAcabadas';
import { ListaTareasHead } from './ListaTareasHead';
import { TareasContext } from '../Interfaz/TareasContext';

export function TableroTareas() {
  const { tableroId, tareas, actualizarTareas } = useContext(TareasContext);
  console.log(tableroId)
  console.log(tareas)

  useEffect(() => {
    actualizarTareas();
  }, [actualizarTareas]);

  if (!tareas) {
    return <div>Cargando tareas...</div>;
  }

  const agregarTarea = async (tarea) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userId = userData.ID;

    const nuevaTarea = {
      prioridad: tarea.prioridad,
      nombre: tarea.nombre,
      observaciones: tarea.observaciones,
      fechaCreacion: tarea.fechaCreacion,
      fechaFinalizacion: tarea.fechaFinalizacion,
      departamento: tarea.ID_DEPARTAMENTO,
      idusuario: userId,
      idtabla: tableroId,
      columna: 1,
    };

    try {
      const response = await fetch('http://localhost:3000/api/tareas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaTarea),
      });

      if (response.ok) {
        const nuevaTareaConId = await response.json();
        actualizarTareas([...tareas, nuevaTareaConId]);
      } else {
        console.error('Error al guardar la tarea');
      }
    } catch (error) {
      console.error('Error en la solicitud', error);
    }
  };

  const agregarTareaEnProgreso = async (tarea) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userId = userData.ID;

    const nuevaTarea = {
      prioridad: tarea.prioridad,
      nombre: tarea.nombre,
      observaciones: tarea.observaciones,
      fechaCreacion: tarea.fechaCreacion,
      fechaFinalizacion: tarea.fechaFinalizacion,
      departamento: tarea.ID_DEPARTAMENTO,
      idusuario: userId,
      idtabla: tableroId,
      columna: 2,
    };

    try {
      const response = await fetch('http://localhost:3000/api/tareas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaTarea),
      });

      if (response.ok) {
        const nuevaTareaConId = await response.json();
        actualizarTareas([...tareas, nuevaTareaConId]);
      } else {
        console.error('Error al guardar la tarea');
      }
    } catch (error) {
      console.error('Error en la solicitud', error);
    }
  };

  const agregarTareaAcabada = async (tarea) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userId = userData.ID;

    const nuevaTarea = {
      prioridad: tarea.prioridad,
      nombre: tarea.nombre,
      observaciones: tarea.observaciones,
      fechaCreacion: tarea.fechaCreacion,
      fechaFinalizacion: tarea.fechaFinalizacion,
      departamento: tarea.ID_DEPARTAMENTO,
      idusuario: userId,
      idtabla: tableroId,
      columna: 3,
    };

    try {
      const response = await fetch('http://localhost:3000/api/tareas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaTarea),
      });

      if (response.ok) {
        const nuevaTareaConId = await response.json();
        actualizarTareas([...tareas, nuevaTareaConId]);
      } else {
        console.error('Error al guardar la tarea');
      }
    } catch (error) {
      console.error('Error en la solicitud', error);
    }
  };

  return (
    <div className="container">
      <ListaTareasHead
        agregarTarea={agregarTarea}
        agregarTareaEnProgreso={agregarTareaEnProgreso}
        agregarTareaAcabada={agregarTareaAcabada}
      />
      <div className="row gutter">
        <TareasPendientes />
        <TareasEnProgreso />
        <TareasAcabadas /> */
      </div>
    </div>
  );
}
