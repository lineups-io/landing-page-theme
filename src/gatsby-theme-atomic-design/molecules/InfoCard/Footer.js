import React from 'react'

import Button from 'gatsby-theme-atomic-design/src/atoms/Button/Button'
import Footer from 'gatsby-theme-atomic-design/src/atoms/InfoCard/Footer'
import Link from 'gatsby-theme-atomic-design/src/atoms/Link'

export default ({ onlineLeasingUrl }) => {
  return (
    <Footer>
      <Button type='secondary' invert as={Link} target='_blank' href='/contact-us/'>
        Contact Us
      </Button>
      <Button type='secondary' as={Link} href={onlineLeasingUrl}>Check Availability</Button>
    </Footer>
  )
}
