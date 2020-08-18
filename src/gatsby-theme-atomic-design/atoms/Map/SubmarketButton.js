import styled from 'styled-components'

import SubmarketButton from 'gatsby-theme-atomic-design/src/atoms/Map/SubmarketButton'

const CustomSubmarketButton = styled(SubmarketButton)`
  color: ${props => props.theme.fontColorWithBackground.secondary};

  svg {
    color: ${props => props.theme.colors.secondary};
  }
`

export default CustomSubmarketButton
