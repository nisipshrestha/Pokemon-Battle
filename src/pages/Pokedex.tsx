import { useQuery, useQueryClient } from "react-query";
import { fetchPokemon } from "../api";
import SearchBox from "../components/SearchBox";
import { useState } from "react";
import Pokemon from "../components/Pokemon";

function Pokedex() {
  const [isSearched, setIsSearched] = useState(false);
  const [search, setSearch] = useState("");

  const queryClient = useQueryClient();
  const pokemonList = queryClient.getQueryData("pokemonList") as any[];

  const { data } = useQuery(["pokemonDetail1", search], fetchPokemon, {
    enabled: isSearched,
  });

  function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    if (isSearched) {
      setIsSearched(false);
    }
    setSearch(value);
  }

  function handleSearch(inputName: string, pokemonName: string) {
    setIsSearched(true);
    setSearch(pokemonName);
  }

  return (
    <section className="pokedex">
      <h1>Pokedex</h1>

      <SearchBox
        label="Pokemon"
        name="pokemonA"
        isSearched={isSearched}
        value={search}
        onSearch={handleSearch}
        onChange={handleChangeSearch}
        dataList={pokemonList}
      />
      <Pokemon name="pokemonA" data={data} isPokedex></Pokemon>
    </section>
  );
}

export default Pokedex;
