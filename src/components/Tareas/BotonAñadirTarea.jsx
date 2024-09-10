import React, { useState } from 'react';
import { CuadroDialogo } from './CuadroDialogo';

export function BotonAñadirTarea({ agregarTarea, className }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const abrirFormulario = () => {
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
  };

  return (
    <>
      <button className={`add-task pt-0 pb-0 ${className}`} id="verde" onClick={abrirFormulario}>+</button>
      {mostrarFormulario && <CuadroDialogo agregarTarea={agregarTarea} cerrarFormulario={cerrarFormulario} />}
    </>
  );
}

