import React, { useEffect, useState } from "react";

type Pokemon = {
  name: string;
  url: string;
};
async function getList(setList: Function) {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=1279&offset=0"
  );
  const { results } = await response.json();
  setList(results);
}

export const Counter: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    getList(setPokemonList);
  }, []);
  console.log(pokemonList);
  return (
    <div className="search_Wrapper">
      <label>Search</label>
      <input type="search" name="data" role="combobox" />
      <datalist id="data" role="listbox">
        {pokemonList.map((pokemon) => (
          <option key={pokemon.name} value={pokemon.name} />
        ))}
      </datalist>
    </div>
  );
};
