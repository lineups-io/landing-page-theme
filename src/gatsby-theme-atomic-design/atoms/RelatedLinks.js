import styled from 'styled-components'

import RelatedLinks from 'gatsby-theme-atomic-design/src/atoms/RelatedLinks'
import Link from 'gatsby-theme-atomic-design/src/atoms/Link/styled'

const CustomRelatedLinks = styled(RelatedLinks)`
  ${Link} {
    color: ${props => props.theme.colors.black};
  }
`

export default CustomRelatedLinks
