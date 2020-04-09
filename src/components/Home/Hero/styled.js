import styled from 'styled-components'

import Link from 'gatsby-theme-core/src/components/Link'

const Hero = styled.div`
  background-color: rgba(0, 0, 0, .6);
  padding: 15px;
  margin-left: -15px;
  margin-right: -15px;
  text-align: left;

  @media (min-width: 576px) {
    position: absolute;
    bottom: 30px;
    z-index: 90;
    width: 608px;
    padding: 30px;
    margin-left: 0;
    margin-right: 0;
  }
`

Hero.Header = styled.h1`
  margin-top: 0px;
  padding-top: 17px;
  padding-bottom: 9px;
  color: ${ props => props.theme.colors.orange };
  font-size: 1em;
  font-weight: 700;
  text-transform: uppercase;


  @media (min-width: 576px) {
    &::before {
      width: 24px;
      height: 2px;
      margin-right: 15px;
      margin-bottom: 6px;
      content: ' ';
      display: inline-block;
      background-color: ${ props => props.theme.colors.orange };
    }
  }
`

Hero.Subheader = styled.h3`
  display: inline;
  font-family: ${ props => props.theme.fonts.header };
  color: #fff !important;
  font-size: 1.8em;
  line-height: 44px;

  @media (min-width: 576px) {
    margin-left: 39px;
  }
`

Hero.Link = styled(Link)`
  margin-top: 33px;
  font-size: .9em;
  font-weight: 400;
  display: inline-block;
  position: relative;
  padding: 5px 0;
  color: #fff;

  @media (min-width: 576px) {
    margin-left: 39px;
  }

  &[href] {
    color: #fff;
  }

  &[href]:hover {
    color: ${ props => props.theme.colors.orange };
    text-decoration: none;
  }

  &[href]::before {
    content: "";
    width: 0px;
    height: 3px;
    background-color: ${ props => props.theme.colors.orange };
    position: absolute;
    z-index: 2;
    left: 0;
    bottom: -2px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease-in-out 0s;
  }

  &:hover::before {
    opacity: 1;
    visibility: visible;
    width: 100%;
  }

  > svg {
    margin-left: 6px;
  }
`

export default Hero
