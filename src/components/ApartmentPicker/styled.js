import styled from 'styled-components'

import { Col, Row } from 'gatsby-theme-core/src/components/Layout/styled'
import Card from 'gatsby-theme-landing-page/src/templates/LandingPage/Card/styled'

export const DropdownRow = styled(Row)`
  justify-content: center;
`

export const DropdownContainer = styled(Col)`
  width: 100%;

  @media (min-width: 768px) {
    width: 50%;
  }
`

export const CardContainer = styled(Card)`
  width: 100%;
  margin-bottom: 30px;

  @media (min-width: 576px) {
    width: 33.33%;
  }
`

export const Header = styled.h1`
  font-weight: 400;
  color: ${ props => props.theme.colors.darkgrey };
  font-size: 3em;
  padding-top: 40px;
  padding-bottom: 10px;
  text-align: center;
`

export const Description = styled.h2`
  font-weight: 400;
  color: ${ props => props.theme.colors.darkgrey };
  font-size: .9em;
  text-align: center;
`
