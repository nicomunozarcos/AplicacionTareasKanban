import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DropdownButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
  };

  return (
    <div className="dropdown">
      <button
        className={`btn btn-secondary btn-sm dropdown-toggle mx-3 pt-0 pb-0 ${isOpen ? 'show' : ''}`}
        type="button"
        onClick={toggleDropdown}
      >
        Opciones
      </button>
      <ul className={`dropdown-menu dropdown-menu-dark arribaZ ${isOpen ? 'show' : ''}`} style={{ right: isOpen ? '0' : '-100%' }}>
        <li><Link className="dropdown-item" to="/micuenta">Mi cuenta</Link></li>
        <li><Link className="dropdown-item" to="/micuenta">Añadir cuenta</Link></li>
        <li><hr className="dropdown-divider"></hr></li>
        <li><Link to="/" className="dropdown-item"  onClick={handleLogout}>Cerrar Sesión</Link></li>
      </ul>
    </div>
  );
};

export default DropdownButton;