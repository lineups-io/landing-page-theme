import React from 'react'

import Banner from 'gatsby-theme-apartment-page/src/components/Banner/styled'
import { Container, Row, Col } from 'gatsby-theme-core/src/components/Layout/styled'

export default () => <Banner>
  <Container>
    <Row>
      <Col>
        <Banner.Row>
          <Banner.Button href='#amenities'>Virtual Tours</Banner.Button>
          <span>Feel Comfortable Touring and Leasing Online</span>
        </Banner.Row>
      </Col>
      <Col>
        <Banner.Row>
          <span>COVID-19 Updates for the ResProp community</span>
          <Banner.Link href='covid19'>Learn More</Banner.Link>
        </Banner.Row>
      </Col>
    </Row>
  </Container>
</Banner>
