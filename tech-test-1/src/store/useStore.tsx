import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import pokemonStore from "@/store/pokemonStore";

const PokemonComponent = observer(() => {
    useEffect(() => {
        pokemonStore.fetchPokemon('ditto');
    }, []);

    if (pokemonStore.isLoading) {
        return <div>Loading...</div>;
    }

    if (pokemonStore.error) {
        return <div>Error: {pokemonStore.error}</div>;
    }

    return (
        <div>
            {pokemonStore.pokemon && (
                    <>
                        <h1>{pokemonStore.pokemon.name}</h1>
                    <img src={pokemonStore.pokemon.sprites.front_default} alt={pokemonStore.pokemon.name} />
    <h2>Abilities:</h2>
    <ul>
    {pokemonStore.pokemon.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
        ))}
    </ul>
    </>
)}
    </div>
);
});

export default PokemonComponent;