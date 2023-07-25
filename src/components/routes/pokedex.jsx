import { PHPController as Controller } from "../content/validations/controller/controller.js";
import { useEffect, useState } from "react";
/**
 * It displays current pokemon data in database
 * @returns Pokemon list from API
 */
function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    getPokemonList();
  }, []);
/**
 * Gets pokemon list from API
 */
  async function getPokemonList() {
    try {
      const response = await Controller.listPokemon();
      setPokemonList(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }
/**
 * Displays pokemon list from API
 * @returns HTML table row
 */
  function showPokemonList() {
    return pokemonList.map((pokemon) => (
      <tr key={pokemon.id}>
        <td>{pokemon.id}</td>
        <td>
          <img src={pokemon.url_imagen} alt={pokemon.nombre} />
        </td>
        <td>{pokemon.nombre}</td>
        <td>{getTypeImage(pokemon)}</td>
        <td>{pokemon.PS}</td>
        <td>{pokemon.ATK}</td>
        <td>{pokemon.DEF}</td>
        <td>{pokemon.VEL}</td>
        <td>{pokemon.ATK_ESP}</td>
        <td>{pokemon.DEF_ESP}</td>
      </tr>
    ));
  }
/**
 * Gets an image based on pokemon type
 * @param {pokemon} pokemon 
 * @returns HTML img tag
 */
  function getTypeImage(pokemon) {
    let url = "img/tipos/";
    if (pokemon.tipo_2) {
      return (
        <>
       <img src={url + pokemon.tipo_1.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "") + '.png'} alt={pokemon.tipo_1} />
       <img src={url + pokemon.tipo_2.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "") + '.png'} alt={pokemon.tipo_2} />
        </>
      );
    } else {
      return <img src={url + pokemon.tipo_1.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "") + '.png'} alt={pokemon.tipo_1} />
    }
  }

  return (
    <div id="tabla">
      <table id="pokedex">
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>Pokémon</th>
            <th>Tipos</th>
            <th>PS</th>
            <th>ATQ</th>
            <th>DEF</th>
            <th>VEL</th>
            <th>ATQ ESP</th>
            <th>DEF ESP</th>
          </tr>
        </thead>
        <tbody>{showPokemonList()}</tbody>
      </table>
    </div>
  );
}

export default Pokedex;
