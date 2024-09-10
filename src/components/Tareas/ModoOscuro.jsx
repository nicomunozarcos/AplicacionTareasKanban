import React, { useState, useEffect } from 'react';

function ModoOscuro() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  useEffect(() => {
    const body = document.querySelector('body');
    const verde = document.querySelectorAll('.add-task');
    body.classList.toggle('dark-mode', darkMode);
    verde.forEach(function (element) {
      element.classList.toggle('dark-mode', darkMode);
    });
    const green = document.querySelectorAll('.agregar');
    green.forEach(function (element) {
      element.classList.toggle('dark-mode', darkMode);
    });
    const navegacion = document.querySelectorAll('.navegacion-color');
    navegacion.forEach(function (element) {
      element.classList.toggle('dark-mode', darkMode);
    });
    const nombretab = document.querySelectorAll('.tablero-activo');
    nombretab.forEach(function (element) {
      element.classList.toggle('dark-mode', darkMode);
    });
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <label className="switch">
      <input
        type="checkbox"
        onChange={toggleDarkMode}
        checked={darkMode}
        id="darkModeSwitch"
      />
      <span className={`slider ${darkMode ? 'dark-mode' : ''}`} />
    </label>
  );
}

export default ModoOscuro;

