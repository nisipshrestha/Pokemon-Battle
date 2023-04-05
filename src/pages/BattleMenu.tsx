import { useState } from "react";
import { useQueries, useQueryClient } from "react-query";
import { fetchPokemon, fetchPokemonList } from "../api";
import Pokemon from "../components/Pokemon";
import SearchBox from "../components/SearchBox";

function BattleMenu() {
  const [search, setSearch] = useState({ pokemonA: "", pokemonB: "" });
  const [isSearched, setIsSearched] = useState({
    pokemonA: false,
    pokemonB: false,
  });

  const queryClient = useQueryClient();
  const pokemonList = queryClient.getQueryData("pokemonList") as any[];

  const [{ data: data1 }, { data: data2 }] = useQueries([
    {
      queryKey: ["pokemonDetail1", search.pokemonA],
      queryFn: fetchPokemon,
      enabled: isSearched.pokemonA,
    },
    {
      queryKey: ["pokemonDetail2", search.pokemonB],
      queryFn: fetchPokemon,
      enabled: isSearched.pokemonB,
    },
  ]);

  function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (isSearched[name as keyof boolean]) {
      setIsSearched((state) => ({ ...state, [name]: false }));
    }
    setSearch((state) => ({ ...state, [name]: value }));
  }

  function handleSearch(inputName: string, pokemonName: string) {
    setIsSearched((state) => ({ ...state, [inputName]: true }));
    setSearch((state) => ({ ...state, [inputName]: pokemonName }));
  }
  return (
    <div className="battle_menu">
      <h1>Guess who&apos;ll win!</h1>
      <SearchBox
        label="Pokemon A"
        name="pokemonA"
        isSearched={isSearched.pokemonA}
        value={search.pokemonA}
        onSearch={handleSearch}
        onChange={handleChangeSearch}
        dataList={pokemonList}
      />
      <h2 className="vs_block">VS</h2>
      <SearchBox
        label="Pokemon B"
        name="pokemonB"
        isSearched={isSearched.pokemonB}
        value={search.pokemonB}
        onSearch={handleSearch}
        onChange={handleChangeSearch}
        dataList={pokemonList}
      />

      <Pokemon name="pokemonA" data={data1}></Pokemon>
      <Pokemon name="pokemonB" data={data2}></Pokemon>
    </div>
  );
}

export default BattleMenu;
