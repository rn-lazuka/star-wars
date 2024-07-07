import { Character, CharacterResponse, CharactersResponse } from '../../types'
import { CharactersData } from '../../pages/Main/Main'

export const characterFixture = (data?: Partial<Character>): Character => ({
  id: '1',
  name: 'Test Luke',
  birthYear: '1991',
  gender: 'male',
  homeWorld: 'Tatuin',
  height: '256',
  hairColor: 'yellow',
  eyeColor: 'black',
  skinColor: 'green',
  mass: '191',
  speciesUrl: [],
  ...data
})

export const characterResponseFixture = (
  data?: Partial<CharacterResponse>
): CharacterResponse => ({
  name: 'Test Luke',
  gender: 'male',
  birth_year: '1991',
  mass: '191',
  skin_color: 'green',
  eye_color: 'black',
  height: '256',
  hair_color: 'yellow',
  url: 'https://swapi.dev/api/people/1/',
  homeworld: 'Tatuin',
  species: [],
  films: [],
  starships: [],
  vehicles: [],
  created: '',
  edited: '',
  ...data
})

export const charactersResponseFixture = (
  data?: Partial<CharactersData>
): CharactersResponse => ({
  next: 2,
  count: 15,
  previous: null,
  results: [
    characterResponseFixture(),
    characterResponseFixture({
      name: 'Test Luke2',
      url: 'https://swapi.dev/api/people/2/'
    })
  ],
  ...data
})
