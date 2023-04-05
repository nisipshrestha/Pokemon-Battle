import { memo } from "react";
import { useQuery } from "react-query";
import { fetchPokemonList } from "./api";

import RouteList from "./routes";

function App() {
   useQuery("pokemonList", fetchPokemonList);
  return (
    <div className="app_container">
      <RouteList></RouteList>
    </div>
  );
}

export default memo(App);
