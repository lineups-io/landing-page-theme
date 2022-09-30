import styled from 'styled-components'

import Aside from 'gatsby-theme-atomic-design/src/templates/LandingPage/Aside'

const CustomAside = styled(Aside)`
  height: calc(100% - 80.5px);
  top: 80.5px;

  @media (min-width: 768px) {
    top: 138px;
    height: calc(100% - 138px);
  }
`

export default CustomAside
