import React, { useState } from 'react';
import { Nota } from './TarjetaNota';

export const TableroNotas = () => {
  const [notas, setNotas] = useState([]);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [notesOrder, setNotesOrder] = useState([]);

  const handleNotaDelete = (id) => {
    setNotas((prevNotas) => prevNotas.filter((nota) => nota.id !== id));
    setActiveNoteId((prevActiveNoteId) => (prevActiveNoteId === id ? null : prevActiveNoteId));
    setNotesOrder((prevOrder) => prevOrder.filter((noteId) => noteId !== id));
  };
  

  const handleAgregarNota = () => {
    const id = Date.now();
    const nuevaNota = { id };
    setNotas((prevNotas) => [...prevNotas, nuevaNota]);
    setActiveNoteId(id);
    setNotesOrder((prevOrder) => [...prevOrder, id]);
  };

  const handleNoteClick = (id) => {
    setActiveNoteId(id);
    setNotesOrder((prevOrder) => {
      const newOrder = prevOrder.filter((noteId) => noteId !== id);
      newOrder.push(id);
      return newOrder;
    });
  };
  

  return (
      <div className="container" id="tableronotas">
      {notesOrder.map((noteId) => {
        const nota = notas.find((nota) => nota.id === noteId);
        if (!nota) {
          return null;
        }
        return (
          <Nota
            key={nota.id}
            id={nota.id}
            onDelete={handleNotaDelete}
            isActive={activeNoteId === nota.id}
            onClick={handleNoteClick}
            zIndex={notesOrder.indexOf(noteId) + 1}
          />
        );
      })}
        <div className="row gutter">
            <h3 className="agregar py-0 my-0">
              <button className="add-task pt-0 mt-0" onClick={handleAgregarNota}>
                +
              </button>
              Agregar nota
            </h3>
          <div id="nota" />
          <div className="col offset-md-8 col-md-4 col-sm-4 col-lg-4 justify-content-center mt-0 pt-0">
          </div>
        </div>
      </div>
  );
};
