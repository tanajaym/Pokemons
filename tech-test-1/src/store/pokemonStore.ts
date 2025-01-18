
import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import '../style/style.scss'

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

    constructor() {makeAutoObservable(this);}

    // Загрузка следующей страницы покемонов
    async fetchPokemons() {
        if (!this. nexPage || this.loading || this.nextPageLoaded) return; // Если следующей страницы нет или уже загружаем данные, выходим

        this.setLoading(true);
        try {
            const response = await axios.get(this. nexPage);
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

    setLoading(value: boolean) {this.loading = value;}
}

export const pokemonStore = new PokemonStore();
