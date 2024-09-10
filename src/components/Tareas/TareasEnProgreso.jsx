import React, {useContext } from "react";
import { Tarea } from './TarjetaTarea';
import { TareasContext } from "../Interfaz/TareasContext";
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../Interfaz/ItemTypes';

export const TareasEnProgreso = () => {
  const { tareas, actualizarTareas } = useContext(TareasContext);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TAREA,
    drop: (item) => {
      const tareaId = item.tareaId;
      const nuevaColumna = '2'; 
  
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

  const tareasEnProgreso = tareas.filter(tarea => tarea.TA_COLUMNA === '2');

  return (
    <div className="col col-md-4 col-sm-4 col-lg-4 justify-content-center mt-0 pt-0 full-height" id="tareasenprogreso-lista" ref={drop}>
      <ul className="lista-tareas">
        {tareasEnProgreso.map((tarea) => (
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
