
import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';

interface Pokemon {
    name: string;
    url: string;
    image: string;
}

class PokemonStore {
    pokemons: Pokemon[] = []; // Список покемонов
    loading = false; // Состояние загрузки
    error = ''; // Состояние ошибки
    currPage = 1; 
    prevPage = 0; 
    wasLastList = false; // Флаг, указывающий, что это последний список

    constructor() {
        makeAutoObservable(this);
    }

    // Загрузка данных
    async fetchPokemons() {
        if (this.wasLastList || this.loading || this.prevPage === this.currPage) return; 

        this.setLoading(true);
        try {
            const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon?offset=${(this.currPage - 1) * 20}&limit=20`
            );

            if (response.data.results.length === 0) {
                runInAction(() => {
                    this.wasLastList = true; 
                });
            } else {
                const pokemonsWithImages = response.data.results.map((pokemon: any) => {
                    const url = new URL(pokemon.url);
                    const pathSegments = url.pathname.split('/').filter(Boolean);
                    const id = pathSegments[pathSegments.length - 1];

                    return {
                        name: pokemon.name,
                        url: pokemon.url,
                        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                    };
                });

                runInAction(() => {
                    this.pokemons = [...this.pokemons, ...pokemonsWithImages];
                    this.prevPage = this.currPage; 
                });
            }
        } catch (error) {
            runInAction(() => {
                this.error = 'Failed to fetch pokemons'; 
            });
        } finally {
            runInAction(() => {
                this.setLoading(false); 
            });
        }
    }

    // Увеличение текущей страницы
    incrementPage() {
        this.currPage += 1;
    }
    removePokemon(name: string) {
        this.pokemons = this.pokemons.filter(pokemon => pokemon.name !== name);
    }
    editPokemon(name: string, newName: string) {
        const pokemon = this.pokemons.find(p => p.name === name);
        if (pokemon) {pokemon.name = newName;}
    }

    setLoading(value: boolean) {
        this.loading = value;
    }
}

export const pokemonStore = new PokemonStore();
