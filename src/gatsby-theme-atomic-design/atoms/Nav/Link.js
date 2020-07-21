import styled from 'styled-components'

import NavLink from 'gatsby-theme-atomic-design/src/atoms/Nav/Link'

const CustomNavLink = styled(NavLink)`
  padding: 0 ${ props => props.theme.gutter }px;
  font-size: 0.8em;
  letter-spacing: 1px;
  font-weight: bold;

  &:hover,
  &.active,
  .active & {
    color: ${props => props.theme.colors.white};
  }

  &::before {
    background-color: ${props => props.theme.colors.white};
  }
`

export default CustomNavLink
