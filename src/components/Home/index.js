import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import GatsbyImage from 'gatsby-image/withIEPolyfill'
import {
  faChevronRight,
} from '@fortawesome/pro-light-svg-icons'

import Hero from './Hero'
import Links from './Links'
import { Container, Row } from 'gatsby-theme-core/src/components/Layout/styled'
import Section from './Section'
import Icon from 'gatsby-theme-core/src/components/Icon'

export default () => {
  const { lobby, kitchen } = useStaticQuery(graphql`
    query getHomePagePhotos {
      lobby: file(relativePath: { eq: "index/lobby.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 2000 maxHeight: 500 cropFocus: CENTER) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      kitchen: file(relativePath: { eq: "index/kitchen.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 2000 maxHeight: 500 cropFocus: CENTER) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return <>
    <Hero />
    <Links />
    <Section id='rockstar-difference'>
      <Container>
        <Row>
          <Section.Aside>
            <Section.Header>
              <span>The Rockstar</span>
              <span>Difference</span>
            </Section.Header>
          </Section.Aside>
          <Section.Body>
            <Section.Subheader>Welcome to Rockstar Capital</Section.Subheader>
            <Section.Text>
              Rockstar Capital was founded in 2011 and has grown to over 3,243
              units across 19 apartment communities in Houston and surrounding
              areas. We have a simple goal in mind: to create a better real
              estate organization based on genuine care for everyone involved.
              We are passionate about enriching the lives of everyone at Rockstar
              Capital, from improving resident lifestyles to expanding the
              training and skill sets of the dedicated teams who manage our
              communities. How do we consistently care? We listen to your needs.
              We communicate across all levels. We stay humble and strive to
              constantly improve. We live and breathe the Rockstar Culture.
            </Section.Text>
            <div>
              <Section.Link href='locations'>
                View Locations <Icon icon={faChevronRight} />
              </Section.Link>
            </div>
          </Section.Body>
        </Row>
      </Container>
    </Section>
    <GatsbyImage fluid={lobby.childImageSharp.fluid} />
    <Section id='rockstar-cares'>
      <Container>
        <Row>
          <Section.Aside>
            <Section.Header>
              <span>Rockstar</span>
              <span>Cares</span>
            </Section.Header>
          </Section.Aside>
          <Section.Body>
            <Section.Subheader>Building a Great Culture Through Connections #RockstarCares</Section.Subheader>
            <Section.Text>
              Our Culture by Connection is a multi-faceted approach that
              includes establishing the Rockstar Culture by Connecting
              through three key areas: Resident Care, Community Service,
              and Personal Relationships. We know that without great
              communities, we wouldn’t have a great business. Here at
              Rockstar Capital, we feel that each person touched by our
              business deserves genuine interactions and a fantastic
              attitude. In everything we do, we want you to know that
              #RockstarCares. We value our residents and want to hear
              what they that have to say about their community. We work
              closely with vendors and employees to make sure that
              everything is running smoothly. We give back to our
              communities with joy, because that is the foundation of our
              strength. Our culture of hard work, passion, and integrity
              is a reflection of the communities we serve. We are dedicated
              to our annual Breast Cancer Awareness #WalkForTheCure which
              has raised over $45,000 since 2016.
            </Section.Text>
          </Section.Body>
        </Row>
      </Container>
    </Section>
    <GatsbyImage fluid={kitchen.childImageSharp.fluid} />
    <Section id='rockstar-pride'>
      <Container>
        <Row>
          <Section.Aside>
            <Section.Header>
              <span>Rockstar</span>
              <span>Pride</span>
            </Section.Header>
          </Section.Aside>
          <Section.Body>
            <Section.Subheader>Award-Winning Property Management #RockstarPride</Section.Subheader>
            <Section.Text>
              At Rockstar Capital Management, we strive to do our best, and
              next time, do it better. That’s why we are continuously working
              with best-in-class property management professionals who truly
              care about the quality of each community and the wellbeing of
              those who live there. Since opening our doors in 2011, we have
              earned 15 city, state and national apartment awards as well as
              being named #15 in the Fast Top 100 fastest growing companies
              with the Houston Business Journal. These numerous industry
              awards reflect our high level of expertise and service. We’re
              proud that our genuine care and expert knowledge shines through
              to all aspects of our properties. Those who work at Rockstar
              Capital, our very own Rockstars, are always giving back. We do
              this through our area outreach, by helping establish communities
              through resident care, serving our residents the best experience
              possible, and building lasting connections upon the solid
              foundation of our shared history, and through every resident
              interaction, no matter how small. This is how we show our
              #RockstarPride.
            </Section.Text>
          </Section.Body>
        </Row>
      </Container>
    </Section>
  </>
}
