import axios from 'axios';
import { action, makeAutoObservable, observable, runInAction } from 'mobx';

// Интерфейс для данных о покемоне
interface Pokemon {
    name: string;
    abilities: { ability: { name: string } }[];
    sprites: { front_default: string };
}

export class PokemonStore {
    pokemon: Pokemon | null = null; // Данные о покемоне
    isLoading = false; // Состояние загрузки
    error: string | null = null; // Ошибка, если есть

    constructor() {
        makeAutoObservable(this, {
            pokemon: observable,
            isLoading: observable,
            error: observable,
            fetchPokemon: action,
        });
    }

    // Метод для загрузки данных о покемоне
    fetchPokemon = async (pokemonName: string) => {
        this.isLoading = true;
        this.error = null;

        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            runInAction(() => {
                this.pokemon = {
                    name: response.data.name,
                    abilities: response.data.abilities,
                    sprites: response.data.sprites,
                };
                this.isLoading = false;
            });
        } catch (err) {
            runInAction(() => {
                this.error = 'Failed to fetch Pokémon data';
                this.isLoading = false;
            });
        }
    };
}

// Экспорт синглтона хранилища
export default new PokemonStore();