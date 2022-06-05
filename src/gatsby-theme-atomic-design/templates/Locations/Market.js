import styled from 'styled-components'

import Market from 'gatsby-theme-atomic-design/src/templates/Locations/Market'

const CustomMarket = styled(Market)`
  font-family: "Open Sans", serif;
  font-weight: lighter;
  text-transform: uppercase;
  letter-spacing: 2px;

  &::after {
    background-color: ${ props => props.theme.colors.primary };
  }
`

export default CustomMarket
