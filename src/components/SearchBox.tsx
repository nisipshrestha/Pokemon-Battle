import React, { useEffect, useState } from "react";
import { Pokemon, SearchBoxProps } from "../types";

async function getList(setList: Function) {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=1279&offset=0"
  );
  const { results } = await response.json();
  setList(results);
}

export const SearchBox: React.FC<SearchBoxProps> = ({ label }) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    getList(setPokemonList);
  }, []);
  console.log(pokemonList);
  return (
    <div className="search_wrapper">
      <label>{label}</label>
      <input type="search" name="data" />
      <datalist id="data" role="listbox">
        {pokemonList.map((pokemon) => (
          <option key={pokemon.name} value={pokemon.name} />
        ))}
      </datalist>
    </div>
  );
};
