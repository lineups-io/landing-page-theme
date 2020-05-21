import React from 'react'

import Button from 'gatsby-theme-atomic-design/src/atoms/Button/Button'
import Link from 'gatsby-theme-atomic-design/src/atoms/Link'
import Footer from 'gatsby-theme-atomic-design/src/atoms/InfoCard/Footer'

import { useMultiContact } from 'gatsby-theme-atomic-design/src/atoms/MultiContact'

// TODO: add dropdown button functionality for "Schedule a Tour"
export default () => {
  const multiContact = useMultiContact()

  return <Footer>
    <Button type='secondary' invert onClick={multiContact.contact}>Contact Us</Button>
    <Button type='secondary' onClick={multiContact.scheduleTour}>Schedule a Tour</Button>
    <p>On-site tours will be scheduled in advanced.</p>
    <p>A leasing professional will help determine what option is best for you.</p>
    <p>Visit our <Link href='https://www.rockstar-capital.com/covid19'>COVID-19 updates page</Link> for more info.</p>
  </Footer>
}
