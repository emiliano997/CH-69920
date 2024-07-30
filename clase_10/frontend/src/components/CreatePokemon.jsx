import { useState } from "react";

export function CreatePokemon() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, description, type);

    fetch("http://localhost:5000/api/pokemons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        type,
      }),
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <form action="http://localhost:5000/api/pokemons" method="POST">
        <input type="text" name="name" placeholder="Nombre" />
        <input type="text" name="description" placeholder="Descripción" />
        <input type="text" name="type" placeholder="Tipo" />
        <button type="submit">Crear</button>
      </form>
    </>
  );
}
