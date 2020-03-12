import styled from 'styled-components'

import { Container, Col } from 'gatsby-theme-core/src/components/Layout/styled'

export const BackgroundImage = styled.div`
  width: 100%;

  @media (min-width: 576px) {
    position: absolute;
    top: 0;
    left: 0;
  }
`

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 500;
  padding: 10px 0px;
  margin: 0px;
`

export const PageHeader = styled(Col)`
  width: 100%;
  background-color: ${ props => props.theme.colors.gray['700'] };
  color: ${ props => props.theme.colors.white };
  padding:
  ${ props => props.theme.gutter * 2 }px
  ${ props => props.theme.gutter }px;
  margin: ${ props => props.theme.gutter * -1 }px 0;
  text-shadow: 1px 1px 1px black;

  @media (min-width: 768px) {
    background-color: transparent;
    color: ${ props => props.theme.colors.white };
    padding:
    ${ props => props.theme.gutter * 2 }px
    ${ props => props.theme.gutter * 5 }px;
    margin: 0;
  }
`

export const Subheader = styled.span`
  font-family: ${ props => props.theme.fonts.header };
`

export const Page = styled.div`
  position: relative;
  overflow: hidden;

  ${ Container } {
    position: relative;
  }
`
