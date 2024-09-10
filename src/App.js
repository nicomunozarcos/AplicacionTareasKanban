import React from 'react';
import { Login } from './components/Interfaz/Login.jsx';
import { PaginaInicio } from './components/Inicio/PaginaInicio.jsx';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { PaginaTareas } from './components/Tareas/PaginaTareas.jsx';
import { PaginaNotas } from './components/Notas/PaginaNotas.jsx';
import './index.css';
import { PaginaDepartamento } from './components/Departamento/PaginaDepartamento.jsx';
import { PaginaMiCuenta } from './components/Mi cuenta/PaginaMiCuenta.jsx';
import { TareasProvider } from './components/Interfaz/TareasContext.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';



const useAuth = () => {
  const userData = localStorage.getItem('userData');
  if (userData) {
    return true;
  } else {
    return false;
  }
};

const PrivateRoute = ({ path, element }) => {
  const auth = useAuth();

  return auth ? element : <Navigate to="/" />;
};



export default function App() {

  return (
    <DndProvider backend={HTML5Backend}>
      <TareasProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/inicio" element={<PrivateRoute element={<PaginaInicio />} />} />
            <Route path="/tareas" element={<PrivateRoute element={<PaginaTareas />} />} />
            <Route path="/notas" element={<PrivateRoute element={<PaginaNotas />} />} />
            <Route path="/departamento" element={<PrivateRoute element={<PaginaDepartamento />} />} />
            <Route path="/micuenta" element={<PrivateRoute element={<PaginaMiCuenta />} />} />
          </Routes>
        </Router>
      </TareasProvider>
    </DndProvider>
  );
}
