import styled from 'styled-components'

import Link from 'gatsby-theme-atomic-design/src/atoms/Nav/Link'

const CustomLink = styled(Link)`
  color: ${props => props.theme.fontColorWithBackground.white};
`

export default CustomLink
