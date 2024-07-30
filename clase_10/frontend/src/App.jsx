import { useEffect, useState } from "react";
import "./App.css";
import { CreatePokemon } from "./components/CreatePokemon";

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/pokemons")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPokemons(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1>Lista de pokemons</h1>

      {pokemons.length > 0 &&
        pokemons.map((pokemon) => {
          return (
            <div key={pokemon._id}>
              <h2>{pokemon.name}</h2>
              <p>{pokemon.description}</p>
              <p>{pokemon.type}</p>
            </div>
          );
        })}

      {pokemons.length === 0 && <h2>No hay pokemons</h2>}

      <CreatePokemon />
    </>
  );
}

export default App;
