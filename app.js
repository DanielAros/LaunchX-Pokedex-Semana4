const getPokemon = () => {
    clean();
    const pokemonName = document.getElementById('nombrePokemon').value.toLowerCase();
    
    const URL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    fetch(URL)
        .then( (res) => {
            if( res.status != "200"){
                // alert('No se encontro el pokemon que buscas');
                throw 'No se encontro al pokemon';
            }else{
                return res.json();
            }
        })
        .then( (data) => {
            const pokeImg = data.sprites.front_default;
            const pokeName = data.name;
            const pokeType = data.types;
            let pokeNameType = pokeType.map( (t) => {
                return t.type.name
            });
    
            const pokeMoves = data.moves;
            let pokeNameMoves = pokeMoves.map( (m) => {
                return m.move.name;
            });
            const pokeStats = data.stats;
            let pokeStat = pokeStats.map( (s) => {
                    return {
                        base: s.base_stat,
                        name: s.stat.name
                    };
            });
            setPokemonImage( pokeImg );
            setInfoPokemon( pokeName, pokeNameType, pokeNameMoves, pokeStat );
        })
        .catch( (err) => {
            console.log(err);
            setPokemonImage('./assets/sad-pikachu.gif');
        });
}

const setPokemonImage = ( urlImg ) => {
    const pokeImg = document.getElementById('pokeImg');
    pokeImg.src = urlImg;
}

const setInfoPokemon = ( name, types, moves, stats) => {

    document.getElementById('name').innerHTML = name;

    let tipo = document.getElementById('types');
    types.forEach( (type) => tipo.innerHTML += type.toUpperCase() + ' ');
    
    stats.forEach( (stat) => {
        let div = document.getElementById(`${stat.name}`);
        let child = div.children;

        let num = parseInt((stat.base/10));
        for(let i = 0; i < 10; i++){
            if(i >= (10 - num)){
                child[i].classList.remove('bar-white');
                child[i].classList.add('bar-blue');
            }else{
                child[i].classList.remove('bar-blue');
                child[i].classList.add('bar-white');
            }
        }
    });

    let ul = document.createElement("ul");
    moves.forEach( (move) => {
        let li = document.createElement("li");
        let p = document.createElement("p");
        p.innerHTML = move;

        li.appendChild(p);

        ul.appendChild(li);
    });

    let infoMoves = document.getElementById('info-moves');
    infoMoves.appendChild(ul);
}

const clean = () => {
    document.getElementById('name').innerHTML = '';
    document.getElementById('types').innerHTML = 'TIPO: ';

    let infoMoves = document.getElementById('info-moves');
    infoMoves.removeChild(infoMoves.lastChild);
}