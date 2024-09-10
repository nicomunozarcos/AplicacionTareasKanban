import React from 'react';
import "../../index.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          Página hecha por Nicolás Muñoz &copy; {new Date().getFullYear()}
        </p>
        <p className="footer-text">Todos los derechos reservados.</p>
        <p className="footer-text">Contacto: nicomunozarcos@gmail.com</p>
      </div>
    </footer>
  );
};

