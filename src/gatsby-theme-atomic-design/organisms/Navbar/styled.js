import styled from "styled-components";

import Link from "gatsby-theme-atomic-design/src/atoms/Link"

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1020;
  background-color: ${ props => props.theme.colors.white };
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  padding: 20px;

  @media (min-width: 768px) {
    padding: 30px 40px;
  }
`

export const Brand = styled.div`
  svg {
      width: 192px;
      height: 28px;
  }

  @media (min-width: 768px) {
    svg {
        width: 264px;
        height: 39px;
    }
  }

  @media (min-width: 1200px) {
    svg {
      width: 336px;
      height: 49px;
    }
  }
`

export const MenuItem = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 10px;
  text-transform: uppercase;
  text-decoration: none;
  color: ${ props => props.theme.colors.black };
  font-family: ff-good-headline-web-pro-con, Tahoma, sans-serif;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${ props => props.theme.colors.tertiary };
    transform: translateY(100%);
    opacity: 0;
    transition: transform .3s, opacity .3s;
  }

  &:hover {
    text-decoration: none;
    color: ${ props => props.theme.colors.tertiary };
  }

  &:hover::after {
    transform: translateY(0%);
    opacity: 1;
  }
`

export const FeaturedMenuItem = styled(MenuItem)`
  display: none;
  @media (min-width: 768px) {
    display: flex;
  }

  width: 100%;
  max-width: 350px;
  padding: 24px 36px;
  background-color: rgba(27,27,27,0.06);
  transition: background-color .3s;
  border-radius: 0;

  font-family: ff-good-headline-condensed-p, Tahoma, sans-serif;
  font-weight: 900;

  &::after {
    display: none;
  }

  &:hover {
    color: black;
    background-color: rgba(27,27,27,0.2);
  }
`

export const Menu = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;

  > ${MenuItem} {
    display: none;
  }

  @media (min-width: 768px) {
    > ${FeaturedMenuItem} {
      display: flex;
    }
  }

  @media (min-width: 1400px) {
    > ${MenuItem} {
      display: flex;
    }
  }
`

export const HamburgerMenu = styled.div`
  .hamburger__bun {
    background-color: ${ props => props.theme.colors.black };
  }

  ${ Menu } {
    z-index: 1010;
    display: flex;
    transition: max-height .3s, padding .3s;
    max-height: ${props => props.open ? '600px' : 0};
    overflow: hidden;
    flex-direction: column;
    position: absolute;
    top: 100%;
    right: 0;
    width: 100%;
    background-color: ${ props => props.theme.colors.secondary };
    padding: ${props => props.open ? '50px' : 0} 80px;

    align-items: flex-start;
  }

  ${ MenuItem } {
    display: flex;
  }

  @media (min-width: 1400px) {
    display: none;
  }
`
