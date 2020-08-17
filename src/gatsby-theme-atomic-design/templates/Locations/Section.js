import styled from 'styled-components'

import Section from 'gatsby-theme-atomic-design/src/templates/Locations/Section'

import ListItem from 'gatsby-theme-atomic-design/src/atoms/ListItem'
import Link from 'gatsby-theme-atomic-design/src/atoms/Link/styled'

const CustomSection = styled(Section)`
  h2 {
    font-family: Beauchef, sans-serif;
    font-size: 1.5em;
    font-weight: 500;
  }

  h4 {
    font-weight: 500;
  }

  ${ ListItem } ${ Link } {
    font-family: "Open Sans", serif;
    font-weight: 300;
  }
`

export default CustomSection
