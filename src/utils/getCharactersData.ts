import { AxiosResponse } from 'axios'
import { Character, CharacterResponse, CharactersResponse } from '../types'
import { API } from './api'
import { charactersResponseToRender } from './converters/characters'

export const getCharacters = async (query: string = '', page: number = 1) => {
  try {
    const {
      data: { next, previous, results, count }
    }: AxiosResponse<CharactersResponse> = await API.get(
      `/people/?search=${query}&page=${page}`
    )

    const characters: Character[] = results.map((result) =>
      charactersResponseToRender(result)
    )
    return { characters, count, next, previous }
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getCharacter = async (id: string) => {
  const { data }: AxiosResponse<CharacterResponse> = await API.get(
    `/people/${id}`
  )
  return charactersResponseToRender(data)
}
