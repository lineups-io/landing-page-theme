import styled from 'styled-components'
import { lighten } from 'polished'

import Link from 'gatsby-theme-atomic-design/src/atoms/Link'

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
  color: ${ props => lighten(0.2, props.theme.colors.primary) };
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
      background-color: ${ props => lighten(0.2, props.theme.colors.primary) };
    }
  }
`

Hero.Subheader = styled.h3`
  display: inline;
  font-family: 'Gilda Display', serif;
  color: #fff !important;
  font-size: 1.8em;
  line-height: 44px;
`

Hero.Link = styled(Link)`
  margin-top: 33px;
  font-size: .9em;
  font-weight: 400;
  display: block;
  color: #fff;
  padding: 0;

  &:hover {
    color: #fff;
    text-decoration: none;
  }

  > svg {
    margin-left: 6px;
  }
`

Hero.Indent = styled.div`
  @media (min-width: 576px) {
    padding-left: 39px;
  }
`

Hero.SearchButton = styled.button`
  display: flex;
  align-items: center;
  border: 1px solid ${ props => props.theme.gray900 };
  background-color: white;
  color: black !important;
  font-size: 16px;
  padding: 4px 8px;
  border-radius: 4px;

  svg path {
    fill: black;
  }

  svg + span {
    padding-left: 8px;
    cursor: text;
  }

  @media (min-width: 576px) {
    min-width: 325px;
  }
`

Hero.IconButton = styled.button`
  padding: 8px;
  border: 0;
  background-color: transparent;
  cursor: pointer;
`

Hero.ModalContainer = styled.div`
  .ReactModal__Content {
    padding: 0;
    height: 100%;
    width: 100%;
    max-height: 100%;
    max-width: 100%;
    inset: 0;
  }

  @media (min-width: 992px) {
    .ReactModal__Content {
      max-height: 80vh;
      max-width: 600px;
      inset: 40px;
    }
  }

  .ReactModal__Content > div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  iframe {
    border: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }

  @media (min-width: 992px) {
    iframe {
      max-width: 550px;
    }
  }
`

export default Hero
