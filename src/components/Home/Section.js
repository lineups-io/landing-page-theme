import styled from 'styled-components'
import { lighten } from 'polished'

import Link from 'gatsby-theme-atomic-design/src/atoms/Link'
import Col from 'gatsby-theme-atomic-design/src/atoms/Col'

const Section = styled.div`
  position: relative;
  background-color: ${ props =>
    props.bg || (props.dark
      ? props.theme.colors.gray700
      : props.theme.colors.white
    ) };
  color: ${ props => props.theme.colors[props.dark ? 'white' : 'black'] };
  font-size: .8em;

  a, button {
    border-color:
      ${ props => props.theme.colors[props.dark ? 'white' : 'black'] };
    color: ${ props => props.theme.colors[props.dark ? 'white' : 'black'] };
  }

  a:hover, button:hover {
    color: ${ props => props.theme.colors[props.dark ? 'white' : 'black'] };
    text-decoration: none;
  }

  svg * {
    fill: ${ props => props.theme.colors[props.dark ? 'white' : 'black'] };
  }

  h2::after {
    background-color:
    ${ props => lighten(props.dark ? 0.2 : 0, props.theme.colors.primary) };
  }

  h3 {
    color:
    ${ props => lighten(props.dark ? 0.2 : 0, props.theme.colors.primary) };
  }

  text-align: center;
  padding-top: ${ props => props.noPadding ? 0 : 15 }px;
  padding-bottom: ${ props => props.noPadding ? 0 : 15 }px;

  @media (min-width: 576px) {
    font-size: 1em;
    padding-top: ${ props => props.noPadding ? 0 : 60 }px;
    padding-bottom: ${ props => props.noPadding ? 0 : 60 }px;
  }
`

Section.Aside = styled(Col)`
  text-align: left;
  flex: 1 1 100%;

  @media (min-width: 576px) {
    flex: 0 0 280px;
    max-width: 280px;
  }
`

Section.Header = styled.h2`
  font-family: 'Gilda Display', serif;
  font-size: 2em;
  line-height: 1.25em;
  font-weight: 400;

  &::after {
    width: 24px;
    height: 2px;
    content: ' ';
    display: ${ props => props.noBorder ? 'none' : 'block' };
    margin-top: 15px;
  }
`

Section.Subheader = styled.h3`
  font-family: 'Avenir', sans-serif;
  font-weight: 600;
  font-size: 1em;
  line-height: 1.5em;
  text-transform: uppercase;
  margin-bottom: 25px;
`

Section.Body = styled(Col)`
  text-align: left;
  flex: 1 1 100%;

  @media (min-width: 576px) {
    flex: 1;
  }
`

Section.Text = styled.p`
  font-family: 'Gilda Display', serif;
  font-size: 1.4em;
  line-height: 1.6em;
  font-weight: 200;
`

Section.Link = styled(Link)`
  display: inline-block;
  margin-top: 30px;
  padding: 20px 30px;
  border-width: 1px;
  border-style: solid;
  border: 1px solid;
  transition: background-color 442ms ease;
  line-height: 1em;
  font-size: 1.1em;

  > svg {
    margin-left: 25px;
  }
`

export default Section
