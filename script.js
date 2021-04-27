const quantidade = document.getElementById('quant');
quantidade.addEventListener('keyup',()=>{
    pegaPokemons(quantidade.value);
})

function pegaPokemons(quant){
    fetch('https://pokeapi.co/api/v2/pokemon?limit='+ quant)
        .then(Response => Response.json())
        .then(allPokemons => {

            const pokemons = [];

            allPokemons.results.map((val)=>{    
                fetch(val.url)
                .then(Response => Response.json())
                .then(pokemonSingle => {
                    let img = pokemonSingle.sprites.front_default;
                    let id = pokemonSingle.id;
                    console.log(pokemonSingle)

                    pokemons.push({nome:val.name,imagens:img,id:id});

                    if(pokemons.length == quant){
                    var pokemonBoxes = document.querySelector('.l-pokemon');
                    pokemonBoxes.innerHTML = "";
                        
                    pokemons.map((val)=>{
                    pokemonBoxes.innerHTML+=`
                        <div class="c-pokemon">
                        <img src="`+ val.imagens +`">
                        <div class="name">`+ val.nome +`</div>
                        <div class="id">`+ val.id +`</div>
                        
                        </div>
                    `            
                    })
                };
            });
        });
    });
}

    