import { makeAutoObservable } from 'mobx';
import axios from 'axios';

interface Pokemon {
    name: string;
    url: string;
}

class PokemonStore {
    pokemons: Pokemon[] = [];
    loading = false;
    error = '';

    constructor() {
        makeAutoObservable(this);
    }

    async fetchPokemons() {
        this.loading = true;
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=124');
            this.pokemons = response.data.results;
        } catch (error) {
            this.error = 'Failed to fetch pokemons';
        } finally {
            this.loading = false;
        }
    }

    removePokemon(name: string) {
        this.pokemons = this.pokemons.filter(pokemon => pokemon.name !== name);
    }

    editPokemon(name: string, newName: string) {
        const pokemon = this.pokemons.find(p => p.name === name);
        if (pokemon) {
            pokemon.name = newName;
        }
    }
}

export const pokemonStore = new PokemonStore();