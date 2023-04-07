import { useState } from "react";
import { useQueries, useQueryClient } from "react-query";
import { fetchPokemon, fetchPokemonList } from "../api";
import Pokemon from "../components/Pokemon";
import SearchBox from "../components/SearchBox";
import { useAppContext } from "../context";

function BattleMenu() {
  const {
    search,
    setSearch,
    isSearched,
    setIsSearched,
    guessAnswer,
    setGuessAnswer,
    correctAnswer,
    setCorrectAnswer,
    battleHistory = [],
    setBattleHistory,
  } = useAppContext();

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
      setIsSearched((state: any) => ({ ...state, [name]: false }));
    }
    setSearch((state: any) => ({ ...state, [name]: value }));
  }

  function handleSearch(inputName: string, pokemonName: string) {
    setIsSearched((state: any) => ({ ...state, [inputName]: true }));
    setSearch((state: any) => ({ ...state, [inputName]: pokemonName }));
  }

  function handleSubmit(param: string) {
    const hpA = +data1.stats[0].base_stat;
    const hpB = +data2.stats[0].base_stat;
    const tempCorrectAnswer = hpA > hpB ? search.pokemonA : search.pokemonB;
    setGuessAnswer(param);
    setCorrectAnswer(tempCorrectAnswer);
    const battleHistoryData = battleHistory.concat({
      ...search,
      guessAnswer: param,
      correctAnswer: tempCorrectAnswer,
      battleDate: new Date().toDateString(),
    });

    setBattleHistory(battleHistoryData);
    localStorage.setItem("battle_history", JSON.stringify(battleHistoryData));
  }
  function handleReset() {
    setGuessAnswer("");
    setCorrectAnswer("");
    setSearch({
      pokemonA: "",
      pokemonB: "",
    });
    setIsSearched({
      pokemonA: false,
      pokemonB: false,
    });
  }

  return (
    <div className="battle_menu">
      <h1 className="heading1">Guess who&apos;ll win?</h1>
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

      {search.pokemonA && search.pokemonB && (
        <>
          <section className="answer_area">
            <button
              disabled={!!guessAnswer}
              className={`submitA ${
                guessAnswer === search.pokemonA ? "active" : ""
              }`}
              type="button"
              onClick={() => handleSubmit(search.pokemonA)}
            >
              <i className="fa-solid fa-check fa-5x"></i>
            </button>
            <h1 className="heading2">Your Guess</h1>
            <button
              disabled={!!guessAnswer}
              className={`submitB ${
                guessAnswer === search.pokemonB ? "active" : ""
              }`}
              type="button"
              onClick={() => handleSubmit(search.pokemonB)}
            >
              <i className="fa-solid fa-check fa-5x"></i>
            </button>
          </section>

          {guessAnswer && (
            <>
              <section className="result_area">
                <i
                  className={`fa-solid fa-check fa-5x ${
                    correctAnswer === search.pokemonA ? "active" : ""
                  }`}
                ></i>
                <h1 className="heading2">Correct Answer</h1>
                <i
                  className={`fa-solid fa-check fa-5x ${
                    correctAnswer === search.pokemonB ? "active" : ""
                  }`}
                ></i>
              </section>

              <button
                className="new_match_btn"
                type="button"
                onClick={handleReset}
              >
                New Match
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default BattleMenu;
