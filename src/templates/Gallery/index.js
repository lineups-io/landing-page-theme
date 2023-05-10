import React from 'react'
import { graphql } from 'gatsby'
import { ThemeProvider, Container, Text } from 'theme-ui'
import { navigate } from '@reach/router'

import Link from 'gatsby-theme-atomic-design/src/atoms/Gallery/Link'
import Gallery from 'gatsby-theme-atomic-design/src/templates/Gallery'
import buildSections from './sections'
import theme from '../../theme-ui'

import Icon from 'gatsby-theme-atomic-design/src/atoms/Icon'

// TODO: add Helmet
const GalleryPage = ({ data, location }) => {
  const back = location.pathname.replace(/gallery\/?$/, '')

  const goBack = e => {
    e.preventDefault()
    navigate(location.state && location.state.fromQuickView ? -1 : back)
  }

  return <ThemeProvider theme={theme}>
    <Container py={3}>
      <Link to={back} variant='links.back' onClick={goBack}>
        <Icon icon='ChevronLeft' />
        <Text px={1}>Back</Text>
      </Link>
    </Container>
    <Gallery sections={buildSections(data.lineups.apartment)} />
  </ThemeProvider>
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
