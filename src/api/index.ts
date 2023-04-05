const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonList() {
  const response = await fetch(`${BASE_URL}/pokemon/?limit=1279&offset=0`);
  return (await response.json())?.results;
}

export async function fetchPokemon(param) {
  const { queryKey } = param;
  if (queryKey[1]) {
    const response = await fetch(`${BASE_URL}/pokemon/${queryKey[1]}`);
    return await response.json();
  }
  return;
}
