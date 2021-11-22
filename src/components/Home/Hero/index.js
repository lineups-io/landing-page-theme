import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import Hero from './styled'
import Section from '../Section'
import Container from 'gatsby-theme-atomic-design/src/atoms/Container'
import Icon from 'gatsby-theme-atomic-design/src/atoms/Icon'

export default () => {
  const data = useStaticQuery(graphql`
    query getHeroData {
      hero: file(relativePath: { eq: "index/pool.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH aspectRatio: 2.5 transformOptions: { cropFocus: CENTER })
        }
      }
    }
  `)

  return <Section id='hero' noPadding>
    <GatsbyImage image={getImage(data.hero)} />
    <Container>
      <Hero>
        <Hero.Header>Life Made Simple is:</Hero.Header>
        <Hero.Subheader>Reserving your new home online.</Hero.Subheader>
        <Hero.Link href='locations'>
            View Our Locations <Icon icon='Arrow' />
        </Hero.Link>
      </Hero>
    </Container>
  </Section>
}
