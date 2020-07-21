import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import GatsbyImage from 'gatsby-image'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

import Section from './Section'
import Container from 'gatsby-theme-atomic-design/src/atoms/Container'
import Row from 'gatsby-theme-atomic-design/src/atoms/Row'
import Icon from 'gatsby-theme-atomic-design/src/atoms/Icon'

import { links } from './About'

export default () => {
  const data = useStaticQuery(graphql`
    query getTeamData {
      team: file(relativePath: { eq: "index/team.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1600 cropFocus: CENTER) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return <>
    <Section id='team-pic' dark noPadding>
      <GatsbyImage fluid={data.team.childImageSharp.fluid} />
    </Section>
    <Section id='team' dark>
      <Container>
        <Row>
          <Section.Aside>
            <Section.Header>Love Where<br />You Work</Section.Header>
          </Section.Aside>
          <Section.Body>
            <Section.Subheader>Our People</Section.Subheader>
            <Section.Text>
            SARES•REGIS Group is dedicated to creating vibrant communities that
            make life comfortable and easy for all our residents. We offer a
            wide range of communities in the best neighborhoods throughout
            Northern and Southern California, as well as Phoenix, Denver,
            Seattle and Portland, and provide personalized and award-winning
            management services at every one.
            </Section.Text>
            <div>
              <Section.Link href={links.jobs}>
                Apply Today <Icon icon={faChevronRight} />
              </Section.Link>
            </div>
          </Section.Body>
        </Row>
      </Container>
    </Section>
  </>
}
