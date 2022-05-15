const pokedex = document.getElementById("pokedex");

const fetchPokemon = () => {
  const promises = [];

  for (let i = 1; i <= 200; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }
  Promise.all(promises).then((results) => {
    const pokemon = results.map((result) => ({
      id: result.id,
      name: result.name.toUpperCase(),
      image: result.sprites["front_default"],
      type: result.types.map((type) => type.type.name).join(" / "),
      height: result.height / 10,
      heightCMM: result.height / 10 >= 1 ? "m" : "cm",
      weight: result.weight / 10,
      weightCMM: result.weight / 10 >= 1 ? "kg" : "g",
      abilities: result.abilities
        .map((ability) => ability.ability.name)
        .join(" / "),
    }));
    displayPokemon(pokemon);
  });
};

const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon
    .map(
      (pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}" loading="lazy"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle"><b>Tipo:</b> ${pokeman.type}</p>
            <p class="card-subtitle"><b>Altura:</b> ${pokeman.height}${pokeman.heightCMM} - <b>Peso:</b> ${pokeman.weight}${pokeman.weightCMM}</p>
            <p class="card-subtitle"><b>Habilidade:</b> ${pokeman.abilities}</p>
        </li>
    `
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
