import styled from 'styled-components'

import ApartmentButton from 'gatsby-theme-atomic-design/src/atoms/Map/ApartmentButton'

const CustomApartmentButton = styled(ApartmentButton)`
  color: ${props => props.theme.colors.tertiary};
`

export default CustomApartmentButton
