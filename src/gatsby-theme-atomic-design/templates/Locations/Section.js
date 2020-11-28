import styled from 'styled-components'

import Section from 'gatsby-theme-atomic-design/src/templates/Locations/Section'
import Link from 'gatsby-theme-atomic-design/src/atoms/Link/styled'

const CustomSection = styled(Section)`
  ${Link} {
    color: ${props => props.theme.colors.black};
  }
`

export default CustomSection
