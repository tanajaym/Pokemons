// import { makeAutoObservable } from 'mobx';
// import axios from 'axios';
//
// interface Pokemon {
//     name: string;
//     url: string;
// }
//
// class PokemonStore {
//     pokemons: Pokemon[] = [];
//     loading = false;
//     error = '';
//
//     constructor() {
//         makeAutoObservable(this);
//     }
//
//     async fetchPokemons() {
//         this.loading = true;
//         try {
//             const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=124');
//             this.pokemons = response.data.results;
//         } catch (error) {
//             this.error = 'Failed to fetch pokemons';
//         } finally {
//             this.loading = false;
//         }
//     }
//
//     removePokemon(name: string) {
//         this.pokemons = this.pokemons.filter(pokemon => pokemon.name !== name);
//     }
//
//     editPokemon(name: string, newName: string) {
//         const pokemon = this.pokemons.find(p => p.name === name);
//         if (pokemon) {
//             pokemon.name = newName;
//         }
//     }
// }
//
// export const pokemonStore = new PokemonStore();

import { makeAutoObservable, action, runInAction } from 'mobx';
import axios from 'axios';

interface Pokemon {
    name: string;
    url: string;
    image: string;
}

class PokemonStore {
    pokemons: Pokemon[] = [];
    loading = false;
    error = '';

    constructor() {
        makeAutoObservable(this);
    }

    // Асинхронный метод для загрузки покемонов
    async fetchPokemons() {
        this.setLoading(true); // Используем action для изменения состояния
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=124');
            const pokemonsWithImages = response.data.results.map((pokemon: any) => ({
                name: pokemon.name,
                url: pokemon.url,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`,
            }));
            runInAction(() => {
                this.pokemons = pokemonsWithImages; // Изменение состояния внутри runInAction
            });
        } catch (error) {
            runInAction(() => {
                this.error = 'Failed to fetch pokemons'; // Изменение состояния внутри runInAction
            });
        } finally {
            runInAction(() => {
                this.setLoading(false); // Используем action для изменения состояния
            });
        }
    }

    // Метод для удаления покемона
    removePokemon(name: string) {
        this.pokemons = this.pokemons.filter(pokemon => pokemon.name !== name);
    }

    // Метод для редактирования имени покемона
    editPokemon(name: string, newName: string) {
        const pokemon = this.pokemons.find(p => p.name === name);
        if (pokemon) {
            pokemon.name = newName;
        }
    }

    // Action для изменения состояния loading
    setLoading(value: boolean) {
        this.loading = value;
    }
}

export const pokemonStore = new PokemonStore();