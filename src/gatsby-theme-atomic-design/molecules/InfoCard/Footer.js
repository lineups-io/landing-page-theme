import React from 'react'

import Button from 'gatsby-theme-atomic-design/src/atoms/Button/Button'
import Link from 'gatsby-theme-atomic-design/src/atoms/Link'
import Footer from 'gatsby-theme-atomic-design/src/atoms/InfoCard/Footer'
import MenuItem from 'gatsby-theme-atomic-design/src/atoms/Dropdown/MenuItem'
import Heading from 'gatsby-theme-atomic-design/src/atoms/Typography/Heading'

import { useMultiContact } from 'gatsby-theme-atomic-design/src/atoms/MultiContact'

import ButtonDropdown from 'gatsby-theme-atomic-design/src/molecules/Dropdown/ButtonDropdown'

export default ({ selfGuidedTourUrl }) => {
  const multiContact = useMultiContact()

  return <Footer>
    <Button type='secondary' invert onClick={multiContact.contact}>Contact Us</Button>
    <ButtonDropdown type='secondary' selected='Select a Tour Today' direction='up'>
      <MenuItem>
        <Button onClick={multiContact.scheduleTour}>
          <Heading as='div'>Onsite Tour</Heading>
          <p>Schedule a personal tour with one of our leasing professionals.</p>
        </Button>
      </MenuItem>
      {selfGuidedTourUrl ? <MenuItem>
        <Link href={selfGuidedTourUrl}>
          <Heading as='div'>Self-Guided Tours</Heading>
          <p>Tour at your own pace and schedule with a self-guided tour.</p>
        </Link>
      </MenuItem> : null}
      <MenuItem>
        <Link href='#amenities'>
          <Heading as='div'>Virtual Tours</Heading>
          <p>Tour from the comfort of your home with our interactive 3D Tours.</p>
        </Link>
      </MenuItem>
    </ButtonDropdown>
    <p>Scheduling a tour in advance is preferred, but our doors are open for walk-in tours.</p>
    <p>Visit our <Link href='https://www.rockstar-capital.com/covid19'>COVID-19 updates page</Link> for more info.</p>
  </Footer>
}
