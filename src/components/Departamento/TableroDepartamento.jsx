import React, {useState} from 'react';
import "../../index.css";
import { BotonAñadirTarea } from '../Tareas/BotonAñadirTarea';
import { Tarea } from '../Tareas/TarjetaTarea';
import "../../styles/CuadroDialogo.css";
import { Link } from 'react-router-dom';


export function TableroDepartamento () {
  const [tareasDepartamento, setTareasDepartamento] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const agregarTarea = (tarea) => {
    const nuevaTarea = {
      nombre: tarea.nombre,
      prioridad: tarea.prioridad,
      fechaCreacion: tarea.fechaCreacion,
      fechaFinalizacion: tarea.fechaFinalizacion,
      observaciones: tarea.observaciones,
    };
    setTareasDepartamento([...tareasDepartamento, nuevaTarea]);
  };


  return(
  <>
    <div className="container mt-1 px-2">
      <div className="row gutter">
        <div className="col col-md-12 col-sm-12 col-lg-12 mt-0 pt-0 tareasdep py-0 px-3">
          <h3 className='mx-2'>Tareas del departamento</h3>
          <div className='tareasdep'>
           <BotonAñadirTarea agregarTarea={agregarTarea} className="addtaskdep" />
          </div>
          <div className="dropdown fxright">
            <button
              className={`btn btn-secondary btn-sm dropdown-toggle mx-3 pt-0 pb-0 ${isOpen ? 'show' : ''}`}
              type="button"
              onClick={toggleDropdown}
            >
              Mis departamentos
            </button>
            <ul className={`dropdown-menu dropdown-menu-dark arribaZ drptext3 ${isOpen ? 'show' : ''}`} style={{ right: isOpen ? '0' : '-100%' }}>
              <li><Link className="dropdown-item pb-0" /*to="/micuenta"*/>Mi departamento 1</Link></li>
              <li><Link className="dropdown-item pb-0" /*to="/micuenta"*/>Mi departamento 2</Link></li>
              <li><hr className="dropdown-divider pt-0"></hr></li>
              <li><Link to="/" className="dropdown-item pt-0 mb-1" >Añadir departamento</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mt-1 cuadrodepartamento">
        <div className="container " style={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'flex-start', flexWrap: 'wrap'}}>
          {tareasDepartamento.map((tarea, index) => (
            <Tarea
            key={index}
            fechaFinalizacion={tarea.fechaFinalizacion}
            fechaCreacion= {tarea.fechaCreacion}
            prioridad={tarea.prioridad}
            nombre={tarea.nombre}
            observaciones={tarea.observaciones}/>
          ))}
        </div>
      </div>
    </div>
  </>
  );
}