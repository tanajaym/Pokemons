// import React, {useEffect} from 'react';
// // import axios from "axios";
// import pokemonStore from "./store/pokemonStore";
// import './App.css';
// import {observer} from "mobx-react-lite";
//
// // export const API_KEY = 'b76b0f17';
//
// const App = observer(() =>  {
//     useEffect(() => {
//         pokemonStore.fetchPokemon('ditto'); // Загружаем данные о покемоне Ditto
//     }, []);
// return (
//     <div className="App">
//         <h1>Pokémon Information</h1>
//
//         {/* loading state */}
//         {pokemonStore.isLoading && <div>Loading...</div>}
//
//         {/* error message */}
//         {pokemonStore.error && <div className="error">Error: {pokemonStore.error}</div>}
//
//         {/*show pokemon info */}
//         {pokemonStore.pokemon && (
//             <div className="pokemon-info">
//                 <h2>{pokemonStore.pokemon.name}</h2>
//                 <img
//                     src={pokemonStore.pokemon.sprites.front_default}
//                     alt={pokemonStore.pokemon.name}
//                 />
//                 <h3>Abilities:</h3>
//                 <ul>
//                     {pokemonStore.pokemon.abilities.map((ability, index) => (
//                         <li key={index}>{ability.ability.name}</li>
//                     ))}
//                 </ul>
//             </div>
//         )}
//     </div>
// );
// });
//
// export default App;

import React from 'react';
import PokemonList from './store/useStore';

const App: React.FC = () => {
    return (
        <div>
            <h1>Pokémon List</h1>
            <PokemonList />
        </div>
    );
};

export default App;