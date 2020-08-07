import styled from 'styled-components'

import Link from 'gatsby-theme-atomic-design/src/atoms/Nav/Link'
import FullscreenMenu from 'gatsby-theme-atomic-design/src/atoms/Nav/FullscreenMenu'
import Background from 'gatsby-theme-atomic-design/src/atoms/Nav/Background'

const CustomFullscreenMenu = styled(FullscreenMenu).attrs({
  type: 'gray200',
})`
  ${ Background } {
    background-color: ${ props => props.theme.colors.gray200 };
  }

  ${ Link } {
    font-weight: 500;
  }
`

export default CustomFullscreenMenu
