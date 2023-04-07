import { useAppContext } from "../context";

function History() {
  const { battleHistory = [] } = useAppContext();

  return (
    <section className="battleHistory">
      <h1>Battle History</h1>

      <div className="history_row label">
        <span>Pokemon A</span>
        <span>Pokemon B</span>
        <span>Guess Answer</span>
        <span>Correct Answer</span>
        <span>Battle Date</span>
      </div>
      {battleHistory.map((x: any) => (
        <div className="history_row">
          <span>{x.pokemonA}</span>
          <span>{x.pokemonB}</span>
          <span>{x.guessAnswer}</span>
          <span>{x.correctAnswer}</span>
          <span>{x.battleDate}</span>
        </div>
      ))}
    </section>
  );
}

export default History;
