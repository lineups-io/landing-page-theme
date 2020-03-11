import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import GatsbyImage from 'gatsby-image'

import Hero from './styled'
import Section from '../Section'
import { Container } from 'gatsby-theme-core/src/components/Layout/styled'
import Icon from 'gatsby-theme-core/src/components/Icon'

export default () => {
  const data = useStaticQuery(graphql`
    query getHeroData {
      hero: file(relativePath: { eq: "index/pool.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 2000 maxHeight: 800 cropFocus: CENTER) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return <Section id='hero' noPadding>
    <GatsbyImage fluid={data.hero.childImageSharp.fluid} />
    <Container>
      <Hero>
        <Hero.Header>Life Made Simple is:</Hero.Header>
        <Hero.Subheader>Reserving your new home online.</Hero.Subheader>
        <Hero.Link href='#markets'>
            View Our Locations <Icon icon='Arrow' />
        </Hero.Link>
      </Hero>
    </Container>
  </Section>
}
