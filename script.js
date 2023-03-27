const pokeContainer = document.querySelector(".pokedex-container");
const pokemonCount = 151;
const colors = {
    fire: "rgb(255, 0, 0)",
    grass: "rgb(0, 255, 0)",
    electric: "rgba(243, 248, 10, 0.8)",
    water: "rgb(0, 0, 255)",
    ground: "rgba(228, 166, 0, 0.8)",
    rock: "#d5d5d4",
    fairy: "rgba(240, 26, 213, 0.64)",
    poison: "rgba(192, 7, 247, 0.8)",
    bug: "rgba(80, 176, 67, 0.8)",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "rgba(4, 240, 250, 0.8)",
    fighting: "rgba(210, 31, 31, 0.9)",
    normal: "rgba(3, 1, 1, 0.8))"
}

const main_types = Object.keys(colors);

// Show Modal Content
const modalContainer = document.querySelector(".modal-container");
const modal = document.querySelector(".modal");


const fetchPokemon = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);
    }

    // Creating a modal for each pokemon which is accessed by clicking on the "More Info" button
const moreInfo = document.querySelector(".open");
moreInfo.addEventListener("click", () => {
    modalContainer.classList.add("show");

    })

    // Closing the modal
    const closeBtn = document.querySelector(".close");
    // console.log(closeBtn);
    closeBtn.addEventListener("click", () => {
        modalContainer.classList.remove("show");
    })
}

const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    // console.log(pokemon);
    createPokemonCard(pokemon);
}

const createPokemonCard = (pokemon) => {
    // Making div for each pokemon and adding class
    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add("pokemon");
    const moreInfo = document.createElement("button");
    moreInfo.classList.add("open");
    moreInfo.innerText = "More Info";
    

    // Uppercasing first letter from name of each pokemon
    const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    // Getting the types of each pokemon
    const pokemonType = pokemon.types.map(ty => ty.type.name);
    const type = main_types.find(type => pokemonType.indexOf(type) > -1);
    // console.log(type);

    // Assigning color to each pokemon
    const color = colors[type];
    pokemonEl.style.backgroundColor = color;
    

    // // Getting the types of each pokemon
    // const poke_types = pokemon.types.map(el => el.type.name);
    // const type = main_types.find(type => poke_types.indexOf(type) > -1);
    // const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    // const color = colors[type];

    // pokemonEl.style.backgroundColor = color;

    const pokeInnerHTML = `
        <div class="img-container">

            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${pokemon.name}">
            
        </div>
        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `;

    pokemonEl.innerHTML = pokeInnerHTML;
    pokemonEl.appendChild(moreInfo);

    pokeContainer.appendChild(pokemonEl);
}

fetchPokemon();



// moreInfo.addEventListener("click", () => {
//     console.log("clicked");
// })
