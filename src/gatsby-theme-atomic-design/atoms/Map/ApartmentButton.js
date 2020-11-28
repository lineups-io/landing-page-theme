import styled from 'styled-components'

import ApartmentButton from 'gatsby-theme-atomic-design/src/atoms/Map/ApartmentButton'

const CustomApartmentButton = styled(ApartmentButton)`
  color: ${props => props.theme.colors[props.highlight ? 'primary' : 'black']};

  path {
    stroke ${props =>
      props.theme.fontColorWithBackground[props.highlight ? 'primary' : 'black']};
  }
`

export default CustomApartmentButton
