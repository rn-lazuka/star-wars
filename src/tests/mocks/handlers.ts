import { http, HttpResponse } from 'msw'
import {
  characterResponseFixture,
  charactersResponseFixture
} from '../fixtures'
import { config } from 'dotenv'

config()

export const handlers = [
  http.get(`${process.env.REACT_APP_API_URL}/people/`, ({ request }) => {
    const url = new URL(request.url)
    const search = url.searchParams.get('search')
    let response = charactersResponseFixture()
    if (search) {
      response = {
        ...charactersResponseFixture(),
        results: charactersResponseFixture().results.filter((char) =>
          char.name.toLowerCase().includes(search.toLowerCase())
        )
      }
    }
    return HttpResponse.json(response)
  }),
  http.get(`${process.env.REACT_APP_API_URL}/people/:id`, () => {
    return HttpResponse.json(characterResponseFixture())
  })
]
