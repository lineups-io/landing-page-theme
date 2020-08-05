import React from 'react'

import Section from 'gatsby-theme-atomic-design/src/atoms/Section'
import Col from 'gatsby-theme-atomic-design/src/atoms/Col'
import Heading from 'gatsby-theme-atomic-design/src/atoms/Typography/Heading'

import Button from 'gatsby-theme-atomic-design/src/atoms/Button/Button'
import Link from 'gatsby-theme-atomic-design/src/atoms/Link'

export default ({ onlineLeasingUrl }) => {

  return (
    <Section id='floor-plan'>
      <Col>
        <Heading as='h3'>Our Floor Plans</Heading>
        <Button type='secondary' as={Link} href={onlineLeasingUrl}>Check Availability</Button>
      </Col>
    </Section>
  )
}

