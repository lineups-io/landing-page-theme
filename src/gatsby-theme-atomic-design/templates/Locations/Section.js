import styled from 'styled-components'

import Section from 'gatsby-theme-atomic-design/src/templates/Locations/Section'

const CustomSection = styled(Section)`
  h2 {
    font-family: proxima-nova, sans-serif;
    font-size: 1.5em;
    font-weight: 500;
  }

  h4 {
    color: ${ props => props.theme.colors.primary };
    font-weight: 500;
  }
`

export default CustomSection
