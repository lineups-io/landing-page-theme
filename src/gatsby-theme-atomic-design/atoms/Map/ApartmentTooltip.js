import styled from 'styled-components'

import ApartmentTooltip from 'gatsby-theme-atomic-design/src/atoms/Map/ApartmentTooltip'

const CustomApartmentTooltip = styled(ApartmentTooltip)`
  .mapboxgl-popup-content {
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.fontColorWithBackground.white};
  }
`

export default CustomApartmentTooltip
