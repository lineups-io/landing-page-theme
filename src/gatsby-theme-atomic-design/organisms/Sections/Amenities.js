import React from 'react'

import Section from 'gatsby-theme-atomic-design/src/atoms/Section'
import Col from 'gatsby-theme-atomic-design/src/atoms/Col'
import Heading from 'gatsby-theme-atomic-design/src/atoms/Typography/Heading'

import AmenityList from 'gatsby-theme-atomic-design/src/organisms/AmenityList'

export default ({ amenities }) => (
  <>
    <Section id='amenities'>
      <Col>
        <Heading as='h3'>Amenities</Heading>
        <AmenityList
          columns={2}
          type='tertiary'
          title='Amenities'
          showAll
          amenities={amenities}
        />
      </Col>
    </Section>
  </>
)

