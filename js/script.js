const pokemonName = document.querySelector('.pokemon--name');
const pokemonNumber = document.querySelector('.pokemon--number');
const pokemonImage = document.querySelector('.pokemon--image');


const form = document.querySelector('.form');
const input = document.querySelector('.input--search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonShine = document.querySelector('.button-shine');

let searchPokemon = 1;


const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {

        const data = await APIResponse.json();

        return data;
    }


}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading ..';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        searchPokemon = data.id;
        input.value = '';
        buttonShine.addEventListener('click',(pokemon) => {
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
        })
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Foumd :c';
        pokemonNumber.innerHTML = '';
    }


}


form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());

});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }

});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})

// buttonShine.addEventListener('click', async (pokemon) => {
//     const data = await fetchPokemon(pokemon);

//     pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
//     console.log(data)
// });

renderPokemon(searchPokemon);