import React, { useState, useEffect } from 'react';
import '../../styles/TarjetaNota.css';
import { Rnd } from 'react-rnd';

export const Nota = ({ id, onDelete, isActive, onClick, zIndex }) => {
  console.log('onDelete:', onDelete);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [title, setTitle] = useState('');
  const [fontSize, setFontSize] = useState(14);
  const [titleFontSize, setTitleFontSize] = useState(16);
  const [addToHomepage, setAddToHomepage] = useState(false);

  const handleDelete = () => {
    const confirmDelete = window.confirm('¿Deseas eliminar la nota?');
    if (confirmDelete) {
      onDelete(id);
    }
  };

  const handleNoteClick = () => {
    onClick(id);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    const { clientX, clientY } = event;
    const rect = event.target.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;
    setContextMenuPosition({ x: offsetX, y: offsetY });
    setIsContextMenuOpen(true);
  };

  const handleCloseContextMenu = () => {
    setIsContextMenuOpen(false);
  };

  const handleColorSelection = (colorType, colorValue) => {
    console.log(`Color ${colorType} seleccionado: ${colorValue}`);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const menu = document.getElementById('context-menu');
      if (menu && !menu.contains(event.target)) {
        handleCloseContextMenu();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <Rnd
      default={{
        x: 0,
        y: 15,
        width: 200,
        height: 100,
      }}
      minWidth={100}
      minHeight={50}
      bounds="parent"
      enableResizing={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: false,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
      dragAxis="both"
      style={{ zIndex: isActive ? 9997 : zIndex }}
      onClick={handleNoteClick}
      onContextMenu={handleContextMenu}
    >
      {isContextMenuOpen && (
        <div
          id="context-menu"
          className="context-menu"
          style={{
            position: 'absolute',
            top: contextMenuPosition.y,
            left: contextMenuPosition.x,
          }}
        >
          <div className="menu-item">
            <span>Color del texto:</span>
            <select onChange={(e) => handleColorSelection('text', e.target.value)}>
              <option value="red">Rojo</option>
              <option value="green">Verde</option>
              <option value="blue">Azul</option>
            </select>
          </div>
          <div className="menu-item">
            <span>Color de fondo:</span>
            <select
              onChange={(e) => handleColorSelection('background', e.target.value)}
            >
              <option value="white">Blanco</option>
              <option value="yellow">Amarillo</option>
              <option value="pink">Rosa</option>
            </select>
          </div>
          <div className="menu-item">
            <span>Tamaño del texto:</span>
            <input
              className='inputmenu'
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
            />
          </div>
          <div className="menu-item">
            <span>Tamaño del título:</span>
            <input
              className='inputmenu'
              type="number"
              value={titleFontSize}
              onChange={(e) => setTitleFontSize(parseInt(e.target.value))}
            />
          </div>
          <div className="menu-item">
            <label for="mi-checkbox">
              Añadir a inicio
              <input
                id="mi-checkbox"
                type="checkbox"
                checked={addToHomepage}
                onChange={(e) => setAddToHomepage(e.target.checked)}
              />
            </label>
          </div>
        </div>
      )}
      <div className="note-title" style={{ fontSize: titleFontSize }}>
        {title}
      </div>
      <textarea
        style={{ width: '100%', height: '100%', fontSize }}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <button className="delete-button" onClick={handleDelete}></button>
    </Rnd>
  );
};
