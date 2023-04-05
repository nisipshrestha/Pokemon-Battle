import { Link } from "react-router-dom";
import PokemonBattle from "../../assets/images/pokemon_battle.png";
export function Navbar() {
  const menuList = [
    { to: "/", label: "Battle Menu" },
    { to: "/pokedex", label: "Pokedex" },
    { to: "/history", label: "Battle History" },
  ];
  return (
    <nav className="navbar">
      <img className="logo" src={PokemonBattle} />
      <ul className="menus">
        {menuList.map((each) => (
          <li key={`link_${each.label}`} className="menu_item">
            <Link to={each.to}>{each.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
