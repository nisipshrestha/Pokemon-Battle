import { memo } from "react";

function Pokemon({ data, name, isPokedex }: any) {
  return (
    data?.name && (
      <div className={`pokemon_card ${name}`}>
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

        {isPokedex && (
          <div className="moves">
            <h2>Moves</h2>

            <ul>
              {data?.moves.slice(0, 4).map((each: any) => (
                <li key={each?.move?.name}>{each?.move?.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  );
}

export default memo(Pokemon);
