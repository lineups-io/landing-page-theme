import styled from 'styled-components'

import Section from 'gatsby-theme-atomic-design/src/templates/Locations/Section'

const CustomSection = styled(Section)`
  h4 {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.9em;
    color: ${ props => props.theme.colors.primary };
  }
`

export default CustomSection
