import styled from 'styled-components'

import Icon from 'gatsby-theme-atomic-design/src/atoms/Icon'

const Logo = styled(Icon).attrs({
  icon: 'HeaderLogo',
})`
  margin: 15px 0;
  height: 34px;
  width: 130px;

  @media (min-width: 375px) {
    margin: 11px 0;
    height: 42px;
    width: 160px;
  }

  @media (min-width: 425px) {
    margin: 7px 0;
    height: 50px;
    width: 189px;
  }
`

export default Logo
