import React from 'react'
import styled from 'styled-components'

import Container from 'gatsby-theme-atomic-design/src/atoms/Container'
import Row from 'gatsby-theme-atomic-design/src/atoms/Row'
import Col from 'gatsby-theme-atomic-design/src/atoms/Col'
import Button from 'gatsby-theme-atomic-design/src/atoms/Button/Button'
import Link from 'gatsby-theme-atomic-design/src/atoms/Link'
import Background from 'gatsby-theme-atomic-design/src/atoms/Background'

const Description = styled.div``

const CustomBanner = styled(Background)`
  background-color: ${ props => props.theme.colors.white };
  ${ Col }:first-child {
    flex-direction: row-reverse;
    align-items: center;
  }

  ${ Col }:last-child {
    display: none;
  }

  ${ Button } {
    border-radius: 8px;
    padding: 8px 12px;
  }

  ${ Button } + ${ Description } {
    padding-right: ${ props => props.theme.gutter }px;
    padding-left: 0;
  }

  ${ Description } {
    flex: 1;
  }

  @media (min-width: 768px) {
    background-color: ${ props => props.theme.colors.gray200 };

    ${ Button } + ${ Description } {
      padding-left: ${ props => props.theme.gutter }px;
      padding-right: 0;
    }

    ${ Col }:first-child {
      flex-direction: row;
    }

    ${ Col }:last-child {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      font-size: 0.9em;

      a {
        font-size: 0.9em;
        font-weight: bold;
        text-decoration: underline;
        padding: 0;
        color: ${ props => props.theme.colors.black };
      }
    }
  }
`


export default () =>
  <CustomBanner>
    <Container>
      <Row>
        <Col>
          <Button type='tertiary' as={Link} href='#amenities'>Virtual Tours</Button>
          <Description>Feel Comfortable Touring and Leasing Online</Description>
        </Col>
        <Col>
          <span>COVID-19 Updates for the Rockstar community</span>
          <Link href='https://www.rockstar-capital.com/covid19'>Learn More</Link>
        </Col>
      </Row>
    </Container>
  </CustomBanner>
