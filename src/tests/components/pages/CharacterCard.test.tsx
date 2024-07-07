import { screen } from '@testing-library/react'
import { CharacterCard } from '../../../components'
import { characterFixture } from '../../fixtures'
import { render } from '../../utils/render'
import userEvent from '@testing-library/user-event'

const character = characterFixture()
describe('CharacterCard component', () => {
  const user = userEvent.setup()
  it('renders character details correctly', () => {
    render(<CharacterCard character={character} />)

    expect(screen.getByText(character.name)).toBeInTheDocument()
    expect(screen.getByText(character.birthYear)).toBeInTheDocument()
    expect(screen.getByText(character.gender)).toBeInTheDocument()
  })

  it('navigates to character details page on click', async () => {
    render(<CharacterCard character={characterFixture()} />)

    const card = screen.getByTestId('character-1-card')
    await user.click(card)

    expect(window.location.pathname).toBe('/characters/1')
  })
})
