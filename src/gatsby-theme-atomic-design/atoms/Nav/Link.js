import styled from 'styled-components'

import Link from 'gatsby-theme-atomic-design/src/atoms/Nav/Link'

const CustomLink = styled(Link)`
  text-transform: none;
  font-size: 1.2em;
  letter-spacing: 1px;
  font-weight: normal;
  padding: 0 ${ props => props.theme.gutter }px;
  color: ${props => props.theme.colors.black};

  &:hover,
  &.active,
  .active & {
    color: ${props => props.theme.colors.primary};
  }

  &::before {
    background-color: ${props => props.theme.colors.primary};
  }
`

export default CustomLink
