// Função para obter o ID do Pokémon da URL
function getPokemonIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Função para carregar os detalhes do Pokémon
function loadPokemonDetail() {
    const pokemonId = getPokemonIdFromURL();
    const pokemonDetailContainer = document.getElementById('pokemonDetail');

    if (pokemonId) {
        // Chama a API para obter os detalhes do Pokémon
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
            .then((response) => response.json())
            .then((pokemon) => {
                // Exibe os detalhes do Pokémon na página
                pokemonDetailContainer.innerHTML = `
                    <div class="pokemon ${pokemon.types[0].type.name}">
                        <h2 class="name">#${pokemon.id} - ${pokemon.name}</h2>
                            <div class="container">
                                <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
                            </div>
                        <ul>
                            <li class="text">Tipos: ${pokemon.types.map(type => type.type.name).join(', ')}</li>
                            <li class="text habilities">Habilidades: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</li>
                            <li class="text">Altura: ${(pokemon.height / 10).toFixed(1)} m</li>
                            <li class="text">Peso: ${(pokemon.weight / 10).toFixed(1)} kg</li>
                        </ul>
                    </div>
                `;
            })
            .catch((error) => {
                pokemonDetailContainer.innerHTML = `<p>Erro ao carregar detalhes do Pokémon.</p>`;
                console.error(error);
            });
    } else {
        pokemonDetailContainer.innerHTML = `<p>ID do Pokémon não encontrado.</p>`;
    }
}

// Chamar a função para carregar os detalhes ao carregar a página
loadPokemonDetail();
