import styled from 'styled-components'

import Link from 'gatsby-theme-atomic-design/src/atoms/Link'

const NavLink = styled(Link)`
  text-transform: uppercase;
  letter-spacing: 2.75px;
  font-size: 0.8em;
  font-weight: 500;
  padding: 0;
  color: ${props => props.theme.fontColorWithBackground.primary};

  position: relative;

  svg + span {
    padding-left: ${props => (props.theme.gutter * 2) / 3}px;
  }

  &:hover,
  &.active,
  .active & {
    color: ${props => props.theme.colors.tertiary};
    text-decoration: none;
  }

  &::before {
    content: '';
    width: 0;
    height: 3px;
    background-color: ${props => props.theme.colors.tertiary};
    position: absolute;
    z-index: 2;
    left: 0;
    bottom: 12px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease-in-out 0s;
  }

  &:hover::before,
  &.active::before,
  .active &::before {
    width: 100%;
    opacity: 1;
    visibility: visible;
  }
`

const CustomLink = styled(NavLink)`
  color: ${props => props.theme.fontColorWithBackground.white};
  font-size: 1.2em;
  letter-spacing: 1px;
  font-weight: 500;
  text-transform: none;
`

export default CustomLink
