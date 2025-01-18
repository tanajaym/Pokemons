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
    nexPage: string | null = 'https://pokeapi.co/api/v2/pokemon?limit=20';
    nextPageLoaded = false;

    constructor() {
        makeAutoObservable(this);
    }

    // Загрузка следующей страницы покемонов
    async fetchPokemons() {
        if (!this. nexPage || this.loading || this.nextPageLoaded) return; // Если следующей страницы нет или уже загружаем данные, выходим

        this.setLoading(true);
        try {
            const response = await axios.get(this. nexPage);
            const pokemonsWithImages = response.data.results.map((pokemon: any) => ({
                name: pokemon.name,
                url: pokemon.url,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`,
            }));
            runInAction(() => {
                this.pokemons = [...this.pokemons, ...pokemonsWithImages]; // Добавляем новые данные к существующим
                this. nexPage = response.data.next; // Обновляем URL следующей страницы
                this.nextPageLoaded = !response.data.next; // Устанавливаем флаг, если следующей страницы нет
            });
        } catch (error) {
            runInAction(() => {
                this.error = 'Failed to fetch more pokemons'; // Изменение состояния внутри runInAction
            });
        } finally {
            runInAction(() => {
                this.setLoading(false); // Используем action для изменения состояния
            });
        }
    }

    // method for removing and editing pokemons
    //remove
    removePokemon(name: string) {this.pokemons = this.pokemons.filter(pokemon => pokemon.name !== name);}
    //edit
    editPokemon(name: string, newName: string) {
        const pokemon = this.pokemons.find(p => p.name === name);
        if (pokemon) {
            pokemon.name = newName;
        }
    }
    // Action для изменения состояния loading
    setLoading(value: boolean) {this.loading = value;}
}

export const pokemonStore = new PokemonStore();