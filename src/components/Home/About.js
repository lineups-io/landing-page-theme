import React from 'react'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

import Container from 'gatsby-theme-atomic-design/src/atoms/Container'
import Row from 'gatsby-theme-atomic-design/src/atoms/Row'
import Section from './Section'
import Icon from 'gatsby-theme-atomic-design/src/atoms/Icon'

export const links = {
  jobs: 'https://careers-sares-regis.icims.com/jobs/intro?hashed=-435627079',
  about: 'http://www.sares-regis.com/',
}

export default () =>
  <Section id='about' bg='#e5eef3'>
    <Container>
      <Row>
        <Section.Aside>
          <Section.Header>The SRG<br />Difference</Section.Header>
        </Section.Aside>
        <Section.Body>
          <Section.Subheader>Our Difference</Section.Subheader>
          <Section.Text>
          Expertise is built into our vertically integrated platform which
          collaborates across acquisitions, asset management, property
          management, construction, and portfolio management. Innovative
          solutions and real-time feedback provide a roadmap to create
          thriving communities that produce value for our clients,
          investors and residents.
          </Section.Text>
          <div>
            <Section.Link href={links.about}>
              About Sares Regis <Icon icon={faChevronRight} />
            </Section.Link>
          </div>
        </Section.Body>
      </Row>
    </Container>
  </Section>
