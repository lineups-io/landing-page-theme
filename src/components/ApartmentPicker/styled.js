import styled from 'styled-components'

import Col from 'gatsby-theme-atomic-design/src/atoms/Col'
import Row from 'gatsby-theme-atomic-design/src/atoms/Row'

export const DropdownRow = styled(Row)`
  justify-content: center;
`

export const DropdownContainer = styled(Col)`
  width: 100%;

  @media (min-width: 768px) {
    max-width: 50%;
  }
`

export const CardContainer = styled(Col)`
  width: 100%;
  flex: 1 1 100%;
  padding: ${ props => props.theme.gutter }px 0;
  margin: 0;

  @media (min-width: 768px) {
    width: 33.33%;
    flex: 0 0 33.33%;
    padding: ${ props => props.theme.gutter * 2 }px ${ props => props.theme.gutter }px;
  }
`

export const Header = styled.h1`
  font-weight: 400;
  color: ${ props => props.theme.colors.gray700 };
  font-size: 3em;
  padding-top: 40px;
  padding-bottom: 10px;
  text-align: center;
`

export const Description = styled.h2`
  font-weight: 400;
  color: ${ props => props.theme.colors.gray700 };
  font-size: .9em;
  text-align: center;
`

export const CardText = styled.p`
  flex: 1;
  font-size: 0.9em;
  color: ${ props => props.theme.colors.gray700 };
`

export const CardImage = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  overflow: hidden;
`
