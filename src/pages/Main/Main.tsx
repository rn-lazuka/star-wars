import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { getCharacters } from '../../utils'
import { Character } from '../../types'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import { CharacterCard } from '../../components'
import debounce from 'lodash/debounce'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export type CharactersData = {
  characters: Character[]
  count: number | null
  next: number | null
  previous: number | null
}

const Main = () => {
  const [charactersData, setCharactersData] = useState<CharactersData | null>(
    null
  )
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchCharacters = async () => {
    try {
      setLoading(true)
      const data = await getCharacters(search, page)
      setCharactersData(data)
    } catch (error) {
      setCharactersData(null)
      console.error(error)
    }
    setLoading(false)
  }

  const handleSearchChange = useMemo(() => {
    return debounce((event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value)
    }, 500)
  }, [])

  useEffect(() => {
    fetchCharacters()
    return () => {
      handleSearchChange.cancel()
    }
  }, [search, page, handleSearchChange])

  return (
    <Stack direction="column" gap={2}>
      <TextField
        label="Search Characters"
        variant="outlined"
        onChange={handleSearchChange}
        inputProps={{
          'data-testid': 'SearchCharactersTextField'
        }}
      />
      {loading && <Typography variant="labelMSB">Loading...</Typography>}
      {!loading && charactersData?.characters.length === 0 && (
        <Typography variant="labelMSB">No results</Typography>
      )}
      {!loading && (
        <Grid container spacing={3}>
          {charactersData?.characters.map((char) => (
            <Grid item xs={12} sm={6} md={4} key={char.id}>
              <CharacterCard character={char} />
            </Grid>
          ))}
        </Grid>
      )}
      {!!charactersData?.count && (
        <Pagination
          count={Math.ceil(charactersData.count / 10)}
          page={page}
          onChange={(event, value) => setPage(value)}
          disabled={loading}
          sx={{
            justifyContent: 'center',
            display: 'flex'
          }}
        />
      )}
    </Stack>
  )
}

export default Main
