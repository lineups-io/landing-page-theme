import styled from 'styled-components'

import Icon from 'gatsby-theme-atomic-design/src/atoms/Icon'

const Logo = styled(Icon).attrs({
  icon: 'HeaderLogo',
})`
  margin: 17px 0;
  height: 30px;
  width: 120px;

  @media (min-width: 375px) {
    margin: 12.5px 0;
    height: 39px;
    width: 155px;
  }

  @media (min-width: 425px) {
    margin: 8px 0;
    height: 48px;
    width: 189px;
  }
`

export default Logo
