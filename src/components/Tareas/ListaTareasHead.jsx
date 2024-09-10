import React, { useEffect } from 'react';
import { BotonAñadirTarea } from './BotonAñadirTarea';

export function ListaTareasHead({ agregarTarea, agregarTareaEnProgreso, agregarTareaAcabada }) {

  useEffect(() => {
    const headerElement = document.getElementById('lista-tareas-header');
    const handleScroll = () => {
      if (window.scrollY> headerElement.offsetTop) {
        headerElement.classList.add('fixed');
      } else {
        headerElement.classList.remove('fixed');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="row gutter no wrap" id="lista-tareas-header">
      <div className="col col-md-4 col-sm-4 col-lg-4 justify-content-center mt-0 pt-0" id="tareaspendientes">
        <h5 className="tareas-color">
          Pendientes
          <BotonAñadirTarea agregarTarea={agregarTarea} />
        </h5>
      </div>
      <div className="col col-md-4 col-sm-4 col-lg-4 justify-content-center mt-0 pt-0" id="tareasenprogreso">
        <h5 className="tareas-color">En progreso
          <BotonAñadirTarea agregarTarea={agregarTareaEnProgreso} />
        </h5>
      </div>
      <div className="col col-md-4 col-sm-4 col-lg-4 justify-content-center mt-0 pt-0" id="tareasacabadas">
        <h5 className="tareas-color">Acabadas
          <BotonAñadirTarea agregarTarea={agregarTareaAcabada} />
        </h5>
      </div>
    </div>
  );
}

