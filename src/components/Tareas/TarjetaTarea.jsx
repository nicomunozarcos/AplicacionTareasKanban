import React, { useState, useEffect, useRef, useContext } from 'react';
import '../../styles/TarjetaTarea.css';
import { TareasContext } from '../Interfaz/TareasContext';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../Interfaz/ItemTypes';
import moment from 'moment';


export function Tarea(props) {
  const { tareaId, fechaCreacion, fechaFinalizacion, prioridad, nombre, observaciones } = props;
  const { handleMoveToOptionClick, handleDeleteClick, actualizarTareas } = useContext(TareasContext);
  const { diasRestantes } = useContext(TareasContext);

  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [isMoveToOptionsVisible, setIsMoveToOptionsVisible] = useState(false);

  const contextMenuRef = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TAREA,
    item: { tareaId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleContextMenu = (event) => {
    event.preventDefault();
    const { clientX, clientY } = event;
    setContextMenuPosition({ x: clientX, y: clientY });
    setIsContextMenuOpen(true);
  };

  const handleOutsideClick = (event) => {
    if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
      setIsContextMenuOpen(false);
      setIsMoveToOptionsVisible(false);
    }
  };

  const handleMoveToClick = () => {
    setIsMoveToOptionsVisible(!isMoveToOptionsVisible);
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  let prioridadBorde = '';
  let prioridadClass = '';
  switch (prioridad.toLowerCase()) {
    case 'baja':
      prioridadClass = 'baja';
      prioridadBorde = 'baja2';
      break;
    case 'media':
      prioridadClass = 'media';
      prioridadBorde = 'media2';
      break;
    case 'alta':
      prioridadClass = 'alta';
      prioridadBorde = 'alta2';
      break;
    case 'urgente':
      prioridadClass = 'urgente';
      prioridadBorde = 'urgente2';
      break;
    default:
      break;
  }

  useEffect(() => {
    actualizarTareas();
  }, []);

  useEffect(() => {
    const today = moment();
    const fechaFinalizacionFormatted = moment(fechaFinalizacion, 'DD-MM-YYYY');
    const differenceInDays = fechaFinalizacionFormatted.diff(today, 'days');
  
    console.log(today);
    console.log(fechaFinalizacionFormatted);
    console.log(differenceInDays);
  
    if (differenceInDays < diasRestantes && prioridad.toLowerCase() !== 'urgente') {
      fetch('http://localhost:3000/api/tareas/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ diasRestantes }),
      })
        .then((response) => {
          if (response.ok) {
            console.log('Tareas actualizadas correctamente en la base de datos');
            actualizarTareas();
          } else {
            throw new Error('Error al actualizar las tareas en la base de datos');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);
  
  


  return (
    <div className={`tarea-card ml-1 ${prioridadBorde} ${isDragging ? 'tarea-dragging' : ''}`} onContextMenu={handleContextMenu} ref={drag}>
      {isContextMenuOpen && (
        <div
          ref={contextMenuRef}
          className="context-menu2"
          style={{
            position: 'absolute',
            top: contextMenuPosition.y,
            left: contextMenuPosition.x,
          }}
        >
          <div className="menu-item2">
            <span>Editar</span>
          </div>
          <div className="menu-item2">
            <span onClick={() => handleDeleteClick(tareaId)}>Eliminar</span>
          </div>
          <div className="menu-item2" onClick={handleMoveToClick}>
            <span>Mover a:</span>
            {isMoveToOptionsVisible && (
              <div className="move-to-options">
                <div className="move-to-option" onClick={() => handleMoveToOptionClick(tareaId, '1')}>
                  Pendientes
                </div>
                <div className="move-to-option" onClick={() => handleMoveToOptionClick(tareaId, '2')}>
                  En Progreso
                </div>
                <div className="move-to-option" onClick={() => handleMoveToOptionClick(tareaId, '3')}>
                  Acabadas
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="tarea-header">
        <div className={`tarea-priority ${prioridadClass}`}>{prioridad}</div>
        <div className="tarea-name">{nombre}</div>
      </div>
      <div className={`tarea-body`}>
        <div className="tarea-dates">
          <div className="tarea-creation-date">Creada: {fechaCreacion}</div>
          <div className="tarea-finish-date">Finaliza: {fechaFinalizacion}</div>
        </div>
        <div className="tarea-observations">{observaciones}</div>
      </div>
    </div>
  );
}
