import styled from 'styled-components'

import FullscreenMenu from 'gatsby-theme-atomic-design/src/atoms/Nav/FullscreenMenu'

import Background from './Background'
import Link from './Link'

const CustomFullscreenMenu = styled(FullscreenMenu).attrs({
  type: 'secondary',
})`

  ${ Background } {
    background-color: ${ props => props.theme.colors.secondary };
  }

  ${ Link } {
    color: ${ props => props.theme.colors.white };
    font-size: 2em;
    font-weight: 500;
  }

  ${ Link }:hover,
  ${ Link }.active,
  .active ${ Link } {
    color: ${props => props.theme.colors.white};
  }

  ${ Link }::before {
    background-color: ${props => props.theme.colors.white};
  }
`

export default CustomFullscreenMenu
