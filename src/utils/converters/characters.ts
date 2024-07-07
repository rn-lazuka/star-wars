import { Character, CharacterResponse } from '../../types'

export const charactersResponseToRender = (
  character: CharacterResponse
): Character => ({
  name: character.name,
  id: character.url.split('/')[5],
  homeWorld: character.homeworld,
  speciesUrl: character.species,
  height: character.height,
  mass: character.mass,
  hairColor: character.hair_color,
  eyeColor: character.eye_color,
  skinColor: character.skin_color,
  birthYear: character.birth_year,
  gender: character.gender
})
