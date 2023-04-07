import { NavLink } from "react-router-dom";
import PokemonBattle from "../../assets/images/pokemon_battle.png";
export function Navbar() {
  const menuList = [
    { to: "/", label: "Battle Ground" },
    { to: "/pokedex", label: "Pokedex" },
    { to: "/history", label: "Battle History" },
  ];
  return (
    <nav className="navbar">
      <img className="logo" src={PokemonBattle} />
      <ul>
        {menuList.map((each) => (
          <li key={`link_${each.label}`}>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to={each.to}
            >
              <span>{each.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
