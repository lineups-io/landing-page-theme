import styled from 'styled-components'

import Hamburger from 'gatsby-theme-atomic-design/src/atoms/Nav/Hamburger'

const CustomHamburger = styled(Hamburger).attrs({
  type: 'primary',
})`
  border-bottom: 1px solid ${ props => props.theme.colors.primary };
`

export default CustomHamburger
