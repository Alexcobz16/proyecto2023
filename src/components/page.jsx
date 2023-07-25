import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import Content from './content/content';

/**
 * Main content of the app
 * @returns All the content of the page
 */
function Page() {
  const isSessionActive = localStorage.getItem('session');

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-sm navbar-dark barra">
        <Link className="navbar-brand" id="linklogo" to="/">
          <img src='./img/logo/logo.jpg' alt='Logo' id='logo'/>
        </Link>
        <div className="collapse navbar-collapse" id="links-navbar">
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            {/* Navbar changes when user is logged */}
            {isSessionActive ? (
              <>
                <li className="nav-item d-flex my-2 my-lg-0">
                  <Link className="nav-link" to="/pokedex">
                    Pokédex
                  </Link>
                </li>
                <li className="nav-item d-flex my-2 my-lg-0">
                  <Link className="nav-link" to="/logout">
                    Cerrar sesión
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item d-flex my-2 my-lg-0">
                  <Link className="nav-link" to="/login">
                    Iniciar sesión
                  </Link>
                </li>
                <li className="nav-item d-flex my-2 my-lg-0">
                  <Link className="nav-link" to="/register">
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <main>
        <Content />
      </main>

    </BrowserRouter>
  );
}

export default Page;
