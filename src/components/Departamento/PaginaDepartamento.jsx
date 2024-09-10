import React from 'react';
import { NavBar } from '../Interfaz/NavBar';
import "../../index.css";
import {Footer} from '../Interfaz/Footer';
import { TableroDepartamento } from './TableroDepartamento';


export const PaginaDepartamento = () => (
  <>
    <NavBar/>
      <TableroDepartamento/>
    <Footer/>
  </>
)