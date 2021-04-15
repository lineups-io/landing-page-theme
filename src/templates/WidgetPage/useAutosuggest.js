import { useState } from 'react'

// TODO: use value to query API
// TODO: use prop to filter API results (e.g. apartment and amenity type)
const useAutosuggest = () => {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])

  return {
    suggestions,
    onSuggestionsFetchRequested: ({ value }) => console.log('onSuggestionsFetchRequested', value),
    onSuggestionsClearRequested: () => setSuggestions([]),
    getSuggestionValue: suggestion => suggestion.value,
    inputProps: {
      value,
      onChange: (e, { newValue }) => setValue(newValue),
    },
  }
}

export default useAutosuggest
