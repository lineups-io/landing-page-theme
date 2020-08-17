import styled from 'styled-components'

import Hamburger from 'gatsby-theme-atomic-design/src/atoms/Nav/Hamburger'

const CustomHamburger = styled(Hamburger).attrs({
  type: 'white',
})`
  border-bottom: 1px solid ${ props => props.theme.colors.gray200 };

  & .hamburger-inner,
  & .hamburger-inner::before,
  & .hamburger-inner::after,
  &.is-active .hamburger-inner,
  &.is-active .hamburger-inner::before,
  &.is-active .hamburger-inner::after {
    background-color: ${props => props.theme.colors.primary};
  }
`

export default CustomHamburger
