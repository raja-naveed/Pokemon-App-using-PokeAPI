import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState(); // state for pokemon name
  const [pokemonData, setPokemonData] = useState({}); // state for pokemon data
  const [pokemonStatus, setPokemonStatus] = useState(false); // state for pokemon status

  useEffect(() => {
    // Code to run on component mount or update goes here.
  }, [pokemon]); // Specify the dependencies for useEffect here.

  const searchPokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((response) => {
        const data = response.data;
        setPokemonStatus(true);
        setPokemonData({
          name: data.name,
          image: data.sprites.front_default,
          type: data.types[0].type.name,
          weight: data.weight,
          height: data.height,
          abilities: data.abilities[0].ability.name,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
        });
      })
      .catch((error) => {
        console.error(error);
        setPokemonStatus(false);
      });

    console.log(pokemonData);
  };
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-yellow-400 text-gray-800 py-10 px-4 flex flex-col items-center justify-center mx-auto max-w-md rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">Pokemon Status</h1>
        <div className="flex items-center mb-6">
          <input
            type="text"
            onChange={(e) => {
              setPokemon(e.target.value);
            }}
            placeholder="Enter Pokemon Name"
            className="px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 mr-2 w-64"
          />
          <button
            onClick={searchPokemon}
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
          >
            Search Pokemon
          </button>
        </div>
      </div>
      {!pokemonStatus ? (
        <div className="text-center text-red-500 mt-4">
          <h1>Seach correct PokeMon</h1>
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
            alt="bulbasaur"
            className="w-24 h-24 mt-4"
          />
        </div>
      ) : (
        <div className="bg-yellow-400 text-gray-800 py-10 px-4 flex flex-col items-center justify-center mx-auto max-w-md rounded-lg shadow-lg mt-4">
          <h1
            id="heading"
            className={`text-4xl font-bold mb-6 ${
              pokemonStatus ? "fade-in" : ""
            }`}
          >
            {pokemonData.name}
          </h1>
          <img
            id="image"
            src={pokemonData.image}
            alt="pokemon"
            className={`w-64 h-64 mb-6 ${pokemonStatus ? "fade-in" : ""}`}
          />

          <div className="flex flex-col items-center justify-center">
            <div className="font-bold text-xl mb-2">
              Type: {pokemonData.type}
            </div>
            <div className="font-bold text-xl mb-2">
              Weight: {pokemonData.weight}
            </div>
            <div className="font-bold text-xl mb-2">
              Height: {pokemonData.height}
            </div>
            <div className="font-bold text-xl mb-2">
              Abilities: {pokemonData.abilities}
            </div>
            <div className="font-bold text-xl mb-2">
              Attack: {pokemonData.attack}
            </div>
            <div className="font-bold text-xl mb-2">
              Defense: {pokemonData.defense}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
