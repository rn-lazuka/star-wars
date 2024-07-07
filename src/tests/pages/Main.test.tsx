import { render } from '../utils/render'
import Main from '../../pages/Main/Main'
import { charactersResponseFixture } from '../fixtures'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { server } from '../mocks/server'
import { http, HttpResponse } from 'msw'

const charactersData = charactersResponseFixture()

describe('View of the characters', () => {
  it('renders loading indicator and search field', () => {
    render(<Main />)
    expect(screen.getByLabelText('Search Characters')).toBeInTheDocument()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders character cards with pagination after loading', async () => {
    render(<Main />)

    await waitFor(() => {
      expect(
        screen.getByTestId(
          `character-${charactersData.results[0].url.split('/')[5]}-card`
        )
      ).toBeInTheDocument()
      expect(
        screen.getByTestId(
          `character-${charactersData.results[1].url.split('/')[5]}-card`
        )
      ).toBeInTheDocument()
    })

    expect(screen.getByRole('button', { name: /1/i })).toBeInTheDocument()
  })

  it('renders no results message when no characters are found', async () => {
    server.use(
      http.get(
        `${process.env.REACT_APP_API_URL}/people/`,
        () => {
          return HttpResponse.json({
            results: [],
            count: 0,
            next: null,
            previous: null
          })
        },
        {
          once: true
        }
      )
    )

    render(<Main />)
    await waitFor(() => {
      expect(screen.getByText('No results')).toBeInTheDocument()
    })
  })

  it('updates search query and fetches new characters', async () => {
    render(<Main />)
    const searchInput = screen.getByTestId('SearchCharactersTextField')
    fireEvent.change(searchInput, { target: { value: 'Luke2' } })

    await waitFor(
      () => {
        expect(screen.queryByText('Test Luke')).not.toBeInTheDocument()
        expect(screen.getByText('Test Luke2')).toBeInTheDocument()
      },
      { timeout: 600 }
    )
  })
})
