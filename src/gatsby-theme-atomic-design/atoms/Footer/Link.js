import styled from 'styled-components'

import Link from 'gatsby-theme-atomic-design/src/atoms/Footer/Link'

const CustomLink = styled(Link)`
  color: ${ props => props.theme.colors.black };
`

export default CustomLink
