import { memo, useState } from "react";
import { useQueries, useQuery } from "react-query";
import { fetchPokemon, fetchPokemonList } from "./api";
import { Layout } from "./components/Layout";
import SearchBox from "./components/SearchBox";

function App() {
  const { data: pokemonList } = useQuery("pokemonList", fetchPokemonList);
  const [search, setSearch] = useState({ pokemonA: "", pokemonB: "" });
  const [isSearched, setIsSearched] = useState({
    pokemonA: false,
    pokemonB: false,
  });

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

  console.log(data1, data2);

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
    <Layout>
      <div className="app_container">
        <h1>Pokemon Battle!</h1>
        <h2>Guess who&apos;ll win!</h2>

        <section className="search_container">
          <SearchBox
            label="Pokemon A"
            name="pokemonA"
            isSearched={isSearched.pokemonA}
            value={search.pokemonA}
            onSearch={handleSearch}
            onChange={handleChangeSearch}
            dataList={pokemonList}
          />
          <span className="vs_block">VS</span>
          <SearchBox
            label="Pokemon B"
            name="pokemonB"
            isSearched={isSearched.pokemonB}
            value={search.pokemonB}
            onSearch={handleSearch}
            onChange={handleChangeSearch}
            dataList={pokemonList}
          />
        </section>
      </div>
    </Layout>
  );
}

export default memo(App);
