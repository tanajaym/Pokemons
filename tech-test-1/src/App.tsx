
import React, {JSX} from 'react';
import PokemonList from './store/useStore';

 const App = (): JSX.Element => {
    return (
        <div>
            <h1 className="heading">Pokémon List</h1>
            <PokemonList />
        </div>
    );
};

export default App;