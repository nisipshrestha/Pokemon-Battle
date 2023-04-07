import { memo, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchPokemonList } from "./api";

import RouteList from "./routes";
import { AppContext } from "./context";

function App() {
  useQuery("pokemonList", fetchPokemonList);
  const [search, setSearch] = useState<{ pokemonA: string; pokemonB: string }>({
    pokemonA: "",
    pokemonB: "",
  });
  const [isSearched, setIsSearched] = useState({
    pokemonA: false,
    pokemonB: false,
  });

  const [guessAnswer, setGuessAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [battleHistory, setBattleHistory] = useState([]);

  useEffect(() => {
    const historyData = localStorage.getItem("battle_history");
    if (historyData) {
      setBattleHistory(JSON.parse(historyData));
    }
  }, []);

  const value = {
    search,
    setSearch,
    isSearched,
    setIsSearched,
    guessAnswer,
    setGuessAnswer,
    correctAnswer,
    setCorrectAnswer,
    battleHistory,
    setBattleHistory,
  };
  return (
    <AppContext.Provider value={value}>
      <RouteList></RouteList>
    </AppContext.Provider>
  );
}

export default memo(App);
