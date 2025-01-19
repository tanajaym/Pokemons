import { pokemonStore } from '@/store/pokemonStore';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PokemonStore', () => {
    beforeEach(() => {
        pokemonStore.pokemons = [];
        pokemonStore.loading = false;
        pokemonStore.error = '';
        pokemonStore.currPage = 1;
        pokemonStore.prevPage = 0;
        pokemonStore.wasLastList = false;
    });

    it('should fetch pokemons and update state', async () => {

        const mockData = {
            results: [
                { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
                { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
            ],
        };
        mockedAxios.get.mockResolvedValue({ data: mockData });

        await pokemonStore.fetchPokemons();

        expect(pokemonStore.pokemons).toEqual([
            {
                name: 'bulbasaur',
                url: 'https://pokeapi.co/api/v2/pokemon/1/',
                image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
            },
            {
                name: 'pikachu',
                url: 'https://pokeapi.co/api/v2/pokemon/25/',
                image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
            },
        ]);
        expect(pokemonStore.loading).toBe(false);
        expect(pokemonStore.error).toBe('');
    });

    it('should handle fetch error', async () => {
        mockedAxios.get.mockRejectedValue(new Error('Network Error'));


        await pokemonStore.fetchPokemons();

        expect(pokemonStore.error).toBe('Failed to fetch pokemons');
        expect(pokemonStore.loading).toBe(false);
    });

    it('should increment page', () => {
        pokemonStore.incrementPage();

        expect(pokemonStore.currPage).toBe(2);
    });

    it('should remove a pokemon', () => {
        pokemonStore.pokemons = [
            { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/', image: 'image1.png' },
            { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/', image: 'image2.png' },
        ];

        pokemonStore.removePokemon('bulbasaur');

        expect(pokemonStore.pokemons).toEqual([
            { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/', image: 'image2.png' },
        ]);
    });

    it('should edit a pokemon name', () => {
        pokemonStore.pokemons = [
            { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/', image: 'image1.png' },
        ];

        pokemonStore.editPokemon('bulbasaur', 'bulbasaur2');

        expect(pokemonStore.pokemons[0].name).toBe('bulbasaur2');
    });
});