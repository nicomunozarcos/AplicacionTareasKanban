import React, { useContext } from 'react';
import { Tarea } from './TarjetaTarea';
import { TareasContext } from '../Interfaz/TareasContext';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../Interfaz/ItemTypes';

export const TareasPendientes = () => {
  const { tareas, actualizarTareas } = useContext(TareasContext);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TAREA,
    drop: (item) => {
      const tareaId = item.tareaId;
      const nuevaColumna = '1'; 
  
      fetch(`http://localhost:3000/api/tareas/actualizar-columna`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tareaId: tareaId,
          nuevaColumna: nuevaColumna,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Tarea actualizada:', data);
          actualizarTareas();
        })
        .catch((error) => {
          console.error('Error al actualizar la tarea:', error);
        });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  

  const tareasPendientes = tareas.filter((tarea) => tarea.TA_COLUMNA === '1');

  return (
    <div className="col col-md-4 col-sm-4 col-lg-4 justify-content-center mt-0 pt-0 full-height" id="tareaspendientes-lista" ref={drop}>
      <ul className="lista-tareas">
        {tareasPendientes.map((tarea) => (
          <Tarea
            key={tarea.TA_ID}
            tareaId={tarea.TA_ID}
            fechaCreacion={tarea.TA_FECHAINI}
            fechaFinalizacion={tarea.TA_FECHAFIN}
            prioridad={tarea.TA_PRIORIDAD}
            nombre={tarea.TA_ASUNTO}
            observaciones={tarea.TA_OBSERVACIONES}
          />
        ))}
      </ul>
    </div>
  );
};
