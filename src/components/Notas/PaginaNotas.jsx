import React from 'react';
import { NavBar } from '../Interfaz/NavBar';
import { Footer } from '../Interfaz/Footer';
import {DropdownNotas} from './DropDownNotas';
import { TableroNotas } from './TableroNotas';

export const PaginaNotas = () => {
  return (
    <>
      <NavBar />
      <DropdownNotas />
      <TableroNotas/>
      <Footer />
    </>
  );
};
