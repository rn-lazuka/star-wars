export interface CharactersResponse {
  count: null | number
  next: null | number
  previous: null | number
  results: CharacterResponse[]
}

export interface CharacterResponse {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
  created: string
  edited: string
  url: string
}
