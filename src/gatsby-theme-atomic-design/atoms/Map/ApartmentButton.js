import styled from 'styled-components'

import ApartmentButton from 'gatsby-theme-atomic-design/src/atoms/Map/ApartmentButton'

const CustomApartmentButton = styled(ApartmentButton)`
  path {
    stroke: ${props => props.theme.colors.white};
  }
`

export default CustomApartmentButton
