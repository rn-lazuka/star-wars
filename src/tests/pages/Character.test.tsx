import { render } from '../utils/render'
import Character from '../../pages/Character/Character'
import { screen, waitFor } from '@testing-library/react'
import { characterFixture } from '../fixtures'
import userEvent from '@testing-library/user-event'
import { act } from 'react'

const character = characterFixture()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockImplementation(() => ({ id: character.id }))
}))

describe('Character component', () => {
  const user = userEvent.setup()

  it('displays loading state initially', () => {
    render(<Character />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders character details correctly after loading', async () => {
    render(<Character />)

    await waitFor(() => {
      expect(screen.getByText(character.name)).toBeInTheDocument()
      expect(screen.getByText(character.birthYear)).toBeInTheDocument()
      expect(screen.getByText(character.gender)).toBeInTheDocument()
    })
  })

  it('renders edit form when edit button is clicked', async () => {
    render(<Character />)
    await waitFor(() => {
      expect(screen.getByTestId('EditCharacterInfoButton')).toBeInTheDocument()
    })
    await act(() => user.click(screen.getByTestId('EditCharacterInfoButton')))
    expect(screen.getByTestId(/nameTextInput/i)).toHaveValue(character.name)
    expect(screen.getByTestId(/birthYearTextInput/i)).toHaveValue(
      character.birthYear
    )
    expect(screen.getByTestId(/genderTextInput/i)).toHaveValue(character.gender)
    expect(screen.getByText(/save/i)).toBeInTheDocument()
    screen.debug(undefined, Infinity)
  })
})
