import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import NoMatch from "../components/NoMatch";
import BattleMenu from "../pages/BattleMenu";
import History from "../pages/History";
import Pokedex from "../pages/Pokedex";

function RouteList() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<BattleMenu />} />
        <Route path="pokedex" element={<Pokedex />}></Route>
        <Route path="history" element={<History />}></Route>
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export default RouteList;
