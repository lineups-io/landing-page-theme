import styled from 'styled-components'

import Section from 'gatsby-theme-atomic-design/src/templates/Locations/Section'

const CustomSection = styled(Section)`
  h2 {
    font-weight: 400;
  }

  h4 {
    color: ${ props => props.theme.colors.tertiary };
    font-weight: 500;
  }
`

export default CustomSection
