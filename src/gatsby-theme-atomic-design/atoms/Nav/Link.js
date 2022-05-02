import styled from 'styled-components'

import Link from 'gatsby-theme-atomic-design/src/atoms/Nav/Link'

const CustomLink = styled(Link)`
  color: ${ props => props.theme.colors.black };
  font-size: 1.2em;
  letter-spacing: 1px;
  padding: 0 15px;
  text-transform: none;

  &:hover,
  &.active,
  .active & {
    color: ${props => props.theme.colors.secondary};
  }

  &::before {
    background-color: ${props => props.theme.colors.secondary};
  }
`

export default CustomLink
