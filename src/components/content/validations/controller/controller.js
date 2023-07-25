import axios from 'axios';
/**
 * Creates request to API
 */
export class PHPController {
/**
 * Gets pokemon list from API
 * @returns Pokemon list, types and stats
 */
  static async listPokemon() {
    let jsonResponse = null;
    try {
      const data = {
        method: 'generateList'
      };

      const response = await axios.post('http://localhost:80/pokedex-api/app/controllers/pokemon_controller.php', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      jsonResponse = response.data;
    } catch (error) {
      console.error(error.message);
    }
    return jsonResponse;
  }
/**
 * Unused yet. Shows details of a specific pokemon
 * @param {id} id 
 * @returns Pokemon name, types, description and stats
 */
  static async showPokemon(id) {
    let jsonResponse = null;
    try {
      const response = await axios.post('', null, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      jsonResponse = response.data;
    } catch (error) {
      console.error(error.message);
    }
    return jsonResponse;
  }
/**
 * Checks if an user is registered
 * @param {username} user 
 * @param {password} password 
 * @returns API response
 */
  static async register(user, password) {
    let jsonResponse = null;
    try {
      const data = {
        username: user,
        password: password,
        method: 'register'
      };

      const response = await axios.post('http://localhost:80/pokedex-api/app/controllers/trainer_controller.php', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      jsonResponse = response.data;
    } catch (error) {
      console.error(error.message);
    }
    return jsonResponse;
  }
/**
 * Checks if form user data is correct
 * @param {username} user 
 * @param {password} password 
 * @returns API response
 */
  static async login(user, password) {
    let jsonResponse = null;
    try {
      const data = {
        username: user,
        password: password,
        method: 'login'
      };

      const response = await axios.post('http://localhost:80/pokedex-api/app/controllers/trainer_controller.php', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      jsonResponse = response.data;
    } catch (error) {
      console.error(error.message);
    }
    return jsonResponse;
  }

}