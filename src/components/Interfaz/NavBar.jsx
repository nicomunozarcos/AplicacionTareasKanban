import React from 'react';
import "../../index.css";
import { Link } from 'react-router-dom';
import ModoOscuro from '../Tareas/ModoOscuro';
import DropdownButton from './DropdownButton';

export const NavBar = () => (
  <>
    <nav className="navbar navbar-expand-lg pb-0 pt-0 ">
      <div className="container-fluid">
        <Link className="navbar-brand mx-3 inicio-color mb-0 mt-1 mb-lg-0" to="/inicio">
          Inicio
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-0 mt-0 mx-5 mb-lg-0">
            <li className="nav-item">
              <h5>
                <Link className="nav-link navegacion-color" to="/tareas">
                  Lista de tareas
                </Link>
              </h5>
            </li>
            <li className="nav-item">
              <h5>
                <Link
                  className="nav-link mx-4 navegacion-color"
                  to="/notas"
                >
                  Notas
                </Link>
              </h5>
            </li>
            <li className="nav-item">
              <h5>
                <Link
                  className="nav-link navegacion-color"
                  to="/departamento"
                >
                  Departamento
                </Link>
              </h5>
            </li>
          </ul>
            <ModoOscuro />
          <form className="d-flex pt-00 mt-0" role="search">
            <input
              className="form-control me-2 heightsearch"
              type="search"
              placeholder="Buscar"
              aria-label="Search"
            />
            <button className="btn btn-outline-success btnheight" type="submit" id="buscar">
              Buscar
            </button>
          </form>
          <DropdownButton />
        </div>
      </div>
    </nav>
    <hr
      style={{
        height: 3,
        backgroundColor: "var(--text-color)",
        marginTop: 0,
        opacity: "0.7",
        marginBottom: 6,
      }}
    />
  </>
)
