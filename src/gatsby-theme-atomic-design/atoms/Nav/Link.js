import styled from 'styled-components'

import Link from 'gatsby-theme-atomic-design/src/atoms/Nav/Link'

const CustomLink = styled(Link)`
  color: ${props => props.theme.fontColorWithBackground.white};
  font-size: 1.2em;
  letter-spacing: 1px;
  font-weight: 500;
  text-transform: none;
`

export default CustomLink
