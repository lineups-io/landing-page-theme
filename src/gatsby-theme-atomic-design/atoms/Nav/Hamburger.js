import styled from 'styled-components'

import Hamburger from 'gatsby-theme-atomic-design/src/atoms/Nav/Hamburger'

const CustomHamburger = styled(Hamburger).attrs({
  type: 'black',
})`
  &:hover .hamburger-inner,
  &:hover .hamburger-inner::before,
  &:hover .hamburger-inner::after {
    background-color: ${props => props.theme.colors.tertiary};
  }
`

export default CustomHamburger
