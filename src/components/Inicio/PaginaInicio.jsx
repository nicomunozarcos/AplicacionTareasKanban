import React, { useState, useEffect } from 'react';
import { NavBar } from '../Interfaz/NavBar';
import { BotonAñadirTarea } from '../Tareas/BotonAñadirTarea';
import "../../index.css";
import { Footer } from '../Interfaz/Footer';
import { Tarea } from '../Tareas/TarjetaTarea';
import { TareasProvider } from '../Interfaz/TareasContext';

export function PaginaInicio() {
  const [tareasInicio, setTareasInicio] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const userId = JSON.parse(userData).ID;
    fetchTareas(userId);
  }, []);

  const agregarTarea = (tarea) => {
    const nuevaTarea = {
      nombre: tarea.nombre,
      prioridad: 'Urgente',
      fechaFinalizacion: tarea.fechaFinalizacion,
      observaciones: tarea.observaciones,
    };
    setTareasInicio([...tareasInicio, nuevaTarea]);
  };

  const fetchTareas = (userId) => {
    fetch(`http://localhost:3000/api/tareas?TA_PRIORIDAD=URGENTE&usuarioId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setTareasInicio(data);
      })
      .catch((error) => {
        console.error("Error al obtener las tareas:", error);
      });
  };

  return (
    <TareasProvider>
      <NavBar />
      <div className="container mt-1 px-2">
        <div className="row gutter">
          <div className="col col-md-12 col-sm-12 col-lg-12 mt-0 pt-0 tareasdep py-0 px-3">
            <h3 className='mx-2'>Tareas urgentes - próxima finalización</h3>
            <div className='tareasdep'>
              <BotonAñadirTarea agregarTarea={agregarTarea} className="addtaskdep"/>
            </div>
          </div>
        </div>
        <div className="container mt-1 pt-3 cuadroinicio">
          {tareasInicio.map((tarea, index) => (
            <Tarea
              key={index}
              tareaId={tarea.TA_ID}
              fechaCreacion={tarea.TA_FECHAINI}
              fechaFinalizacion={tarea.TA_FECHAFIN}
              prioridad={tarea.TA_PRIORIDAD}
              nombre={tarea.TA_ASUNTO}
              observaciones={tarea.TA_OBSERVACIONES}
            />
          ))}
        </div>
      </div>
      <div className="container mt-4 px-2">
        <div className="row gutter">
          <div className="col col-md-12 col-sm-12 col-lg-12 mt-0 pt-0 tareasdep py-0 px-3">
            <h3 className='mx-2'>Notas Importantes</h3>
            <div className='tareasdep'>
              <BotonAñadirTarea agregarTarea={agregarTarea} className="addtaskdep" />
            </div>
          </div>
        </div>
        <div className="container mt-1 cuadroinicio-notas">
        </div>
      </div>
      <Footer />
    </TareasProvider>
  );
}
