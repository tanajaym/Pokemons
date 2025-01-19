
import React, { JSX, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { pokemonStore } from './pokemonStore';
import '../style/style.scss';

const PokemonList = (): JSX.Element => {

    useEffect(() => {
        pokemonStore.fetchPokemons();
    }, []);

    // Обработчик прокрутки
    const onScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 10 && !pokemonStore.loading && !pokemonStore.wasLastList) {
            pokemonStore.incrementPage(); 
            pokemonStore.fetchPokemons(); 
        }
    };


    useEffect(() => {
        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [onScroll]);

    if (pokemonStore.loading && pokemonStore.pokemons.length === 0) return <div>Loading...</div>;
    if (pokemonStore.error) return <div>Error: {pokemonStore.error}</div>;

    return (
        <div className='wrapper'>
            {pokemonStore.pokemons.map((pokemon) => (
                <div key={pokemon.name} className='pokemonCard'>
                    <img src={pokemon.image} alt={pokemon.name} />
                    <span className="pokemonName">{pokemon.name}</span>
                    <div className="buttonsWrapper">
                        <button onClick={() => pokemonStore.removePokemon(pokemon.name)}>Remove</button>
                        <button onClick={() => {
                            const newName = prompt('Enter new name', pokemon.name);
                            if (newName) pokemonStore.editPokemon(pokemon.name, newName);
                        }}>Edit
                        </button>
                    </div>
                </div>
            ))}
            {pokemonStore.loading && <div>Loading more pokemons...</div>}
            {pokemonStore.wasLastList && <div>No more pokemons to load.</div>}
        </div>
    );
};

export default observer(PokemonList);