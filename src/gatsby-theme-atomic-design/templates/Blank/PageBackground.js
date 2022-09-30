import styled from 'styled-components'

import PageBackground from 'gatsby-theme-atomic-design/src/templates/Blank/PageBackground'

const CustomPageBackground = styled(PageBackground).attrs({
  type: 'white',
})`
  padding-top: 80.5px;

  @media (min-width: 768px) {
    padding-top: 138px;
  }
`

export default CustomPageBackground
