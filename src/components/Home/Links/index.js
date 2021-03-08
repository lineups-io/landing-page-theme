import React from 'react'
import { faMoneyBill } from './faMoneyBill'
import { faTools } from './faTools'
import { faFileAlt } from './faFileAlt'

import Section from '../Section'
import Container from 'gatsby-theme-atomic-design/src/atoms/Container'
import Icon from 'gatsby-theme-atomic-design/src/atoms/Icon'
import { Links, IconLink } from './styled'

const LinksSection = () =>
  <Section id='links' layout='center'>
    <Container>
      <Section.Subheader>Welcome Home</Section.Subheader>
      <Section.Header as='h1' noBorder>
        Rockstar living with all the online conveniences you expect.
      </Section.Header>
      <Links>
        <IconLink href='residents'>
          <Icon icon={faMoneyBill} size='2x' />
          Pay Rent Online
        </IconLink>
        <IconLink href='residents'>
          <Icon icon={faTools} size='2x' />
          Schedule Maintenance
        </IconLink>
        <IconLink href='residents'>
          <Icon icon={faFileAlt} size='2x' />
          Renew Lease
        </IconLink>
      </Links>
    </Container>
  </Section>

export default LinksSection
