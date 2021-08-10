import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import Hero from './styled'
import Section from '../Section'
import Container from 'gatsby-theme-atomic-design/src/atoms/Container'

export default () => {
  const data = useStaticQuery(graphql`
    query getHeroData {
      hero: file(relativePath: { eq: "index/hero.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH transformOptions: { cropFocus: CENTER })
        }
      }
    }
  `)

  return <Section id='hero' dark noPadding>
    <GatsbyImage image={data.hero.childImageSharp.gatsbyImageData} />
    <Container>
      <Hero>
        <Hero.Header>Life Made Simple is:</Hero.Header>
        <Hero.Subheader>Reserving your new home online.</Hero.Subheader>
        <Hero.Link href='#markets'>
            View Our Locations
        </Hero.Link>
      </Hero>
    </Container>
  </Section>
}
