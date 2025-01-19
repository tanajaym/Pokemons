import { pokemonStore } from '@/store/pokemonStore';
import axios from 'axios';

// Мокаем axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PokemonStore', () => {
    beforeEach(() => {
        // Сбрасываем состояние store перед каждым тестом
        pokemonStore.pokemons = [];
        pokemonStore.loading = false;
        pokemonStore.error = '';
        pokemonStore.currPage = 1;
        pokemonStore.prevPage = 0;
        pokemonStore.wasLastList = false;
    });

    it('should fetch pokemons and update state', async () => {
        // Мокаем ответ от API
        const mockData = {
            results: [
                { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
                { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
            ],
        };
        mockedAxios.get.mockResolvedValue({ data: mockData });

        // Вызываем метод fetchPokemons
        await pokemonStore.fetchPokemons();

        // Проверяем, что состояние обновилось
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
        // Мокаем ошибку
        mockedAxios.get.mockRejectedValue(new Error('Network Error'));

        // Вызываем метод fetchPokemons
        await pokemonStore.fetchPokemons();

        // Проверяем, что состояние обновилось
        expect(pokemonStore.error).toBe('Failed to fetch pokemons');
        expect(pokemonStore.loading).toBe(false);
    });

    it('should increment page', () => {
        // Вызываем метод incrementPage
        pokemonStore.incrementPage();

        // Проверяем, что страница увеличилась
        expect(pokemonStore.currPage).toBe(2);
    });

    it('should remove a pokemon', () => {
        // Добавляем тестовых покемонов
        pokemonStore.pokemons = [
            { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/', image: 'image1.png' },
            { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/', image: 'image2.png' },
        ];

        // Вызываем метод removePokemon
        pokemonStore.removePokemon('bulbasaur');

        // Проверяем, что покемон удалён
        expect(pokemonStore.pokemons).toEqual([
            { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/', image: 'image2.png' },
        ]);
    });

    it('should edit a pokemon name', () => {
        // Добавляем тестового покемона
        pokemonStore.pokemons = [
            { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/', image: 'image1.png' },
        ];

        // Вызываем метод editPokemon
        pokemonStore.editPokemon('bulbasaur', 'bulbasaur2');

        // Проверяем, что имя покемона изменилось
        expect(pokemonStore.pokemons[0].name).toBe('bulbasaur2');
    });
});