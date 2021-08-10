import styled from 'styled-components'

import State from 'gatsby-theme-atomic-design/src/templates/Locations/State'
import List from 'gatsby-theme-atomic-design/src/atoms/List'

const CustomState = styled(State)`
  ${ List }::before {
    display: none;
  }
`

export default CustomState
