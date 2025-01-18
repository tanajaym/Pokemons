// import React, { useEffect } from 'react';
// import { observer } from 'mobx-react-lite';
// import { pokemonStore } from './pokemonStore';
// import styles from './style/pokemonInterfaceStyle';
//
// const PokemonList: React.FC = observer(() => {
//     useEffect(() => {
//         pokemonStore.fetchPokemons();
//     }, []);
//
//     if (pokemonStore.loading) return <div>Loading...</div>;
//     if (pokemonStore.error) return <div>Error: {pokemonStore.error}</div>;
//
//     return (
//         <div className={styles.list}>
//             {pokemonStore.pokemons.map(pokemon => (
//                 <div key={pokemon.name} className={styles.item}>
//                     <span>{pokemon.name}</span>
//                     <button onClick={() => pokemonStore.removePokemon(pokemon.name)}>Remove</button>
//                     <button onClick={() => {
//                         const newName = prompt('Enter new name', pokemon.name);
//                         if (newName) pokemonStore.editPokemon(pokemon.name, newName);
//                     }}>Edit</button>
//                 </div>
//             ))}
//         </div>
//     );
// });
//
// export default PokemonList;
//
import React, {JSX, useEffect, useCallback} from 'react'; // Импорт React (обязательно для React 16 и ниже)
import { observer } from 'mobx-react-lite';
import { pokemonStore } from './pokemonStore';
// @ts-ignore
// import Styles from './styles';

// Определяем тип для пропсов (если они есть)
interface PokemonListProps {
    // Например, можно добавить пропсы, если они нужны
}

interface Pokemon {
    name: string;
    url: string;
    image: string;
}

// Компонент без React.FC
const PokemonList = (props: PokemonListProps): JSX.Element => {
    useEffect(() => {
        pokemonStore.fetchPokemons();
    }, []);

    // Обработчик бесконечной прокрутки
    const handleScroll = useCallback(() => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

        // Если пользователь прокрутил до конца страницы и не происходит загрузка
        if (scrollTop + clientHeight >= scrollHeight - 10 && !pokemonStore.loading && !pokemonStore.nextPageLoaded) {
            pokemonStore.fetchPokemons();
        }
    }, []);

    // Добавляем обработчик прокрутки
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    if (pokemonStore.loading) return <div>Loading...</div>;
    if (pokemonStore.error) return <div>Error: {pokemonStore.error}</div>;

    return (
        <div className='wrapper'>
            {pokemonStore.pokemons.map((pokemon: Pokemon) => (
                <div key={pokemon.name} className='listPokemon'>
                    <img src={pokemon.image}></img>
                    <span>{pokemon.name}</span>
                    <button onClick={() => pokemonStore.removePokemon(pokemon.name)}>Remove</button>
                    <button onClick={() => {
                        const newName = prompt('Enter new name', pokemon.name);
                        if (newName) pokemonStore.editPokemon(pokemon.name, newName);
                    }}>Edit</button>
                </div>
            ))}
        </div>
    );
};

export default observer(PokemonList);