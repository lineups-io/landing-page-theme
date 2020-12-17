import styled from 'styled-components'

import Link from 'gatsby-theme-atomic-design/src/atoms/Nav/Link'

const CustomLink = styled(Link)`
  color: ${props => props.theme.fontColorWithBackground.black};
  padding: 0 ${ props => props.theme.gutter }px;
  font-size: .9em;
  letter-spacing: 1px;
  font-weight: 700;

  &:hover {
    color: ${props => props.theme.colors.tertiary};
  }

  &::before {
    background-color: ${props => props.theme.colors.tertiary};
  }
`

export default CustomLink
