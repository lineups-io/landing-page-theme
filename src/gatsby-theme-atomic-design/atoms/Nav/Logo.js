import styled from 'styled-components'

import Logo from 'gatsby-theme-atomic-design/src/atoms/Nav/Logo'

const CustomLogo = styled(Logo)`
  margin: 0 0 0 -10px;
  width: 220px;
  height: 34px;

  * {
    fill: ${ props => props.theme.colors.white };
  }
`

export default CustomLogo
