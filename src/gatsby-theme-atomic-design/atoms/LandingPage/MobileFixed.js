import styled from 'styled-components'

import MobileFixed from 'gatsby-theme-atomic-design/src/atoms/LandingPage/MobileFixed'

const CustomMobileFixed = styled(MobileFixed)`
  top: 80.5px;

  @media (min-width: 768px) {
    top: 0;
  }
`

export default CustomMobileFixed

