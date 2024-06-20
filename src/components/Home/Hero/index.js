import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import {
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import ReactModal from 'react-modal'

import Hero from './styled'
import Section from '../Section'
import Container from 'gatsby-theme-atomic-design/src/atoms/Container'
import Icon from 'gatsby-theme-atomic-design/src/atoms/Icon'
import Modal from 'gatsby-theme-atomic-design/src/molecules/Modal'

import './index.css'

ReactModal.setAppElement('#___gatsby')

export default () => {
  const [open, setOpen] = useState(false)
  const data = useStaticQuery(graphql`
    query getHeroData {
      hero: file(relativePath: { eq: "index/hero.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH aspectRatio: 2.4 transformOptions: { cropFocus: CENTER })
        }
      }
    }
  `)

  return <Section id='hero' dark noPadding>
    <GatsbyImage image={data.hero.childImageSharp.gatsbyImageData} />
    <Container>
      <Hero>
        <Hero.Header>Life Made Simple is:</Hero.Header>
        <Hero.Indent>
          <Hero.Subheader>Reserving your new home online.</Hero.Subheader>
          <Hero.SearchButton onClick={() => setOpen(true)}>
            <Icon icon={faSearch} />
            <span>Search by location or community</span>
          </Hero.SearchButton>
        </Hero.Indent>
      </Hero>
    </Container>
    <Modal isOpen={open} onRequestClose={() => setOpen(false)}>
      <Hero.IconButton onClick={() => setOpen(false)}>
        <Icon icon={faTimes} />
      </Hero.IconButton>
      <iframe src='https://lineups-apartment-search-aim2022.netlify.app/' />
    </Modal>
  </Section>
}
