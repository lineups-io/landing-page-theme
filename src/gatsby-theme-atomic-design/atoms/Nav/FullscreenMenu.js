import styled from 'styled-components'

import FullscreenMenu from 'gatsby-theme-atomic-design/src/atoms/Nav/FullscreenMenu'

import Background from './Background'
import Link from './Link'

const CustomFullscreenMenu = styled(FullscreenMenu).attrs({
  type: 'black',
})`
  background-color: #27283b;

  ${ Background } {
    background-color: #27283b;
  }

  ${ Link } {
    color: ${ props => props.theme.colors.white };
    font-size: 2.2em;
    font-weight: 600;
    text-transform: uppercase;
  }

  ${Link}:hover,
  ${Link}.active,
  .active ${Link} {
    color: ${props => props.theme.colors.primary};
  }


  ${ Link }:before {
    width: 100%;
    opacity: 1;
    visibility: visible;
    background-color: ${ props => props.theme.colors.primary };
  }
`

export default CustomFullscreenMenu
