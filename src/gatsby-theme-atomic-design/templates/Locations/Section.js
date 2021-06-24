import styled from 'styled-components'

import Section from 'gatsby-theme-atomic-design/src/templates/Locations/Section'
import Link from 'gatsby-theme-atomic-design/src/atoms/Link/styled'

const CustomSection = styled(Section)`
  h2 {
    font-family: proxima-nova, sans-serif;
    font-size: 1.5em;
    font-weight: 500;
  }

  h4 {
    color: ${ props => props.theme.colors.tertiary };
    font-weight: 500;
  }

  ${Link} {
    color: ${props => props.theme.colors.black};
  }
`

export default CustomSection
