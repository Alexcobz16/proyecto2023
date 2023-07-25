import React, { useRef, useEffect } from 'react';
import { validateLogin } from '../content/validations/login';
/**
 * Displays Login form
 * @returns Login form
 */
function Login() {
  const formRef = useRef(null);
/**
 * When clicked on submit it goes to login validation
 */
  useEffect(() => {
    if (formRef.current) {
      validateLogin();
    }
  }, []);

  return (
    <div className="contenido-formulario">
      <h2 className="titulo">Iniciar sesión</h2>
      <form id="login" ref={formRef}>
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
        <p id="error-servidor" class="text-red-600"></p>
        <button id="submit" type="submit" class="btn btn-primary">Enviar</button>
      </form>
    </div>
  );

}

export default Login;