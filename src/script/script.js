const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const searchBar = document.getElementById('searchBar');
const maxRecords = 151;
let limit = 10;
let offset = 0;


function loadPokemonItems(offset, limit){
    pokeApi.getPokemons(offset, limit).then( (pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type} ">
                <a href="detalhes.html?id=${pokemon.number}" class="pokemon-link">
                        <span class="number inline">#${pokemon.number}</span>
                        <span class="name inline">${pokemon.name}</span>
        
                        <div class="detail">
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>` ).join('')}
                            </ol>
                            <img src="${pokemon.photo}" alt="${pokemon.name}">
                        </div>
                        </a>
                    </li>
            `).join('')
    })
}


loadMoreButton.addEventListener('click', ()=> {
    offset += limit

    const qtnRecordNextpage = offset + limit
    if(qtnRecordNextpage >= maxRecords){
        const newLimit =  maxRecords  - offset

        loadPokemonItems(offset, newLimit)
        
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
    loadPokemonItems(offset, limit)
})

loadPokemonItems(offset, limit);
