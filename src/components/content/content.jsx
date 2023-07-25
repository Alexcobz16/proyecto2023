import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../routes/home';
import Login from '../routes/login';
import Register from '../routes/register';
import Logout from '../routes/logout';
import Pokedex from '../routes/pokedex';

/**
 * Content changes dynamically depending on the path
 * @returns Content component
 */
function Content() {
    return (
        <Routes>
            <Route path="/" element={
                <div id="contenido">
                    <Home />
                </div>
            } />
            <Route path="/login" element={
                <div id="formulario">
                    <Login />
                </div>
            } />
            <Route path="/register" element={
                <div id="formulario">
                    <Register />
                </div>
            } />
            <Route path="/pokedex" element={
                <div id="contenido">
                    <Pokedex />
                </div>
            } />
            <Route path="/logout" element={
                <div id="contenido">
                    <Logout />
                </div>
            } />
        </Routes>
    );
}

export default Content;