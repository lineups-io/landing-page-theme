import React from 'react'
import { graphql } from 'gatsby'
import { Container, Text } from 'theme-ui'

import Link from 'gatsby-theme-lineups/src/atoms/Link'
import Gallery from 'gatsby-theme-lineups/src/templates/Gallery'
import buildSections from './sections'

import Icon from 'gatsby-theme-atomic-design/src/atoms/Icon'

// TODO: add Helmet
const GalleryPage = ({ data, location, navigate }) => {
  const back = location.pathname.replace(/gallery\/?$/, '')

  const goBack = e => {
    e.preventDefault()
    navigate(back, { replace: true })
  }

  return <>
    <Container py={3}>
      <Link to={back} variant='links.back' onClick={goBack}>
        <Icon icon='ChevronLeft' />
        <Text px={1}>Back</Text>
      </Link>
    </Container>
    <Gallery sections={buildSections(data.lineups.apartment)} />
  </>
}

export const query = graphql`
  query getGalleryPage($id: ID! $account: ID!) {
    lineups {
      site: getAccountById(id: $account) {
          ...NavFields
          ...FooterFields
      }
      apartment: getApartmentById(id: $id) {
        ...ApartmentFields2
      }
    }
  }
`

export default GalleryPage
