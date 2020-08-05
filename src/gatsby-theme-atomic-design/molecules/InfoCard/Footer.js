import React from 'react'

import Button from 'gatsby-theme-atomic-design/src/atoms/Button/Button'
import Footer from 'gatsby-theme-atomic-design/src/atoms/InfoCard/Footer'
import Link from 'gatsby-theme-atomic-design/src/atoms/Link'

export default () => {
  return (
    <Footer>
      <Button type='secondary' as={Link} href='contact-us'>
        Contact Us
      </Button>
    </Footer>
  )
}
