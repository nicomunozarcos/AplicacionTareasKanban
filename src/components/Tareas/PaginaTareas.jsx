import React from 'react';
import { NavBar } from '../Interfaz/NavBar';
import { TableroTareas } from './TableroTareas';
import {Footer} from '../Interfaz/Footer';
import { DropdownTareas } from './DropDownTareas';


export function PaginaTareas() {

  return (
    <>
      <NavBar />
      <DropdownTareas/>
      <TableroTareas/>
      <Footer/>
    </>
  );
}
