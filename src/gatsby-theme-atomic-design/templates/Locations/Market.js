import styled from 'styled-components'

import Market from 'gatsby-theme-atomic-design/src/templates/Locations/Market'

import List from 'gatsby-theme-atomic-design/src/atoms/List'

const CustomMarket = styled(Market)`
  &::after {
    background-color: ${ props => props.theme.colors.primary };
  }
`

export default CustomMarket
