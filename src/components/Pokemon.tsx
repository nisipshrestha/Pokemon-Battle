import { memo } from "react";

function Pokemon({ data, name }: any) {
  return (
    data?.name && (
      <div className={`pokemon_card ${name === "pokemonB" ? "card_2" : ""}`}>
        {data?.stats?.[0]?.base_stat && (
          <div className="pokemon_title_wrapper">
            <div>
              <h2 className="pokemon_title">{data.name}</h2>
              <div className="pokemon_stat_wrapper">
                <h3 className="hp_text">HP: {data.stats[0].base_stat}</h3>
              </div>
            </div>
          </div>
        )}

        {data?.sprites?.front_default && (
          <div className="pokemon_image_wrapper">
            <img className="pokemon_image" src={data.sprites.front_default} />
          </div>
        )}
      </div>
    )
  );
}

export default memo(Pokemon);
