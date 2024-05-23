const input = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const pokemonContainer = document.getElementById("pokemon-container");


searchForm.addEventListener('submit', e => {
    e.preventDefault();
    searchPokemon();
});



const searchPokemon = async () => {
    try {
    //I will get the input value and pass it to lower case, for example if you enter PikaCHU, it will be pikachu
      const nameOrId = input.value.toLowerCase();
      //Fetch data from the pokeapi
      const getData = await fetch(
        `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`
      );
      //Here I parse the response as JSON
      const data = await getData.json();
  
      //Here I add the values of the pokemon info to each div
      pokemonName.textContent = `${data.name.toUpperCase()}`;
      pokemonId.textContent = `#${data.id}`;
      weight.textContent = `Weight: ${data.weight}`;
      height.textContent = `Height: ${data.height}`;
      //I create an image element to show the pokemon picture
      pokemonContainer.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">`;
      hp.textContent = data.stats[0].base_stat;
      attack.textContent = data.stats[1].base_stat;
      defense.textContent = data.stats[2].base_stat;
      specialAttack.textContent = data.stats[3].base_stat;
      specialDefense.textContent = data.stats[4].base_stat;
      speed.textContent = data.stats[5].base_stat;
  
      //This will add the type of the pokemon
      types.innerHTML = data.types.map(obj => `<span class="type ${obj.type.name}">${obj.type.name.toUpperCase()}</span>`).join('');
    } catch (err) {
      resetValues();
      alert('Pokemon not found');
      console.log(`Pokemon not found: ${err}`);
    }
  };
  //This function will kick in when there is an error from async
  const resetValues = () => {
    //Created an array of elements to reset
    const elementsToReset = [
        pokemonName,
        pokemonId,
        types,
        height,
        weight,
        hp,
        attack,
        defense,
        specialAttack,
        specialDefense,
        speed
    ];

    // Remove pokemon picture if there is one on the screen
    const pokemonPicture = document.getElementById('pokemon');
    if (pokemonPicture) {
        pokemonPicture.remove();
    }

    // Reset each element in the array
    elementsToReset.forEach(element => {
        element.textContent = '';
        if (element.innerHTML) {
            element.innerHTML = ''; // For elements like 'types' which use innerHTML
        }
    });
};

