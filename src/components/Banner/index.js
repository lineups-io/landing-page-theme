import React from 'react'

import Container from 'gatsby-theme-atomic-design/src/atoms/Container'
import Row from 'gatsby-theme-atomic-design/src/atoms/Row'
import Col from 'gatsby-theme-atomic-design/src/atoms/Col'

import Banner from './styled'

export default () =>
  <Banner>
    <Container>
      <Row>
        <Col>
          <Banner.Title>COVID-19 (CORONAVIRUS) Updates</Banner.Title>
          <Banner.SubTitle>The latest information for the SRG community</Banner.SubTitle>
        </Col>
        <Col>
          <Banner.Link href='https://www.sares-regis.com/covid-19'>Click To Learn More</Banner.Link>
        </Col>
      </Row>
    </Container>
  </Banner>
