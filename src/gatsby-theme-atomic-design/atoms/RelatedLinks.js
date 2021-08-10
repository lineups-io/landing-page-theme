import styled from 'styled-components'

import RelatedLinks from 'gatsby-theme-atomic-design/src/atoms/RelatedLinks'
import Heading from 'gatsby-theme-atomic-design/src/atoms/Typography/Heading'

const CustomRelatedLinks = styled(RelatedLinks)`
  ${ Heading } {
    color: ${ props => props.theme.colors.black };
  }
`

export default CustomRelatedLinks

