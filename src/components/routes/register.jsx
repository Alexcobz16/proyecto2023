import React, { useRef, useEffect } from 'react';
import { validateRegister } from '../content/validations/register';
/**
 * Displays register form
 * @returns Register form
 */
function Register() {
  const formRef = useRef(null);
/**
 * When clicked on submit it goes to register validation
 */
  useEffect(() => {
    if (formRef.current) {
      validateRegister()
    }
  }, []);

  return (
    <div className="contenido-formulario">
      <h2 className="titulo">Registrarse</h2>
      <form id="register" ref={formRef}>
        <div class="mb-4">
          <label class="form-label">Usuario</label>
          <input
            type="text"
            class="form-control"
            name="usuario"
            id="usuario"
            aria-describedby="helpId"
            placeholder="Nombre de usuario"
            minLength={4}
            required
          />
          <p id="error-usuario" class="text-red-600 text-xs"></p>
        </div>
        <div class="mb-4">
          <label for="" class="form-label">Contraseña</label>
          <input
            type="password"
            class="form-control"
            name="contraseña"
            id="contraseña"
            aria-describedby="helpId"
            placeholder="Contraseña"
            minLength={6}
            required
          />
          <p id="error-contraseña" class="text-red-600 text-xs"></p>
        </div>
        <div class="mb-4">
          <label for="" class="form-label">Fecha de nacimiento</label>
          <input type="date"
            class="form-control"
            name="fecha"
            id="fecha"
            aria-describedby="helpId"
            required
          />
          <p id="error-fecha" class="text-red-600 text-xs"></p>
        </div>
        <div class="mb-4">
          <label for="" class="form-label"></label>
          <div class="form-check form-check-inline">
            <input class="form-check-input"
              type="checkbox"
              id="condiciones"
              value="condiciones"
              required
            />
            <label class="form-check-label">Acepta los términos y condiciones de uso</label>
          </div>
          <p id="error-condiciones" class="text-red-600 text-xs"></p>
        </div>
        <p id="error-servidor" class="text-red-600"></p>
        <button id="submit" type="submit" class="btn">Crear cuenta</button>
      </form>
    </div>
  );
}

export default Register;