import React, { useState, useEffect } from 'react'
import { Button, Container, Text } from 'theme-ui'
import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'

import Modal from 'gatsby-theme-lineups/src/atoms/Modal'
import Gallery from 'gatsby-theme-lineups/src/templates/Gallery'
import buildSections from './sections'

import Icon from 'gatsby-theme-atomic-design/src/atoms/Icon'

import './GalleryModal.css'

const style = {
  content: {
    inset: 0,
    border: 0,
    padding: 0,
  },
}

// TODO: need to set cursor: pointer on button
const GalleryModal = props => {
  const location = useLocation()
  const [show, setShow] = useState()
  useEffect(() => {
    setShow(location.search.match(/gallery/) ? true : false)
  }, [location])

  const closeGallery = () => {
    const search = location.search.replace(/^\?/, '').split('&')
    const index = search.indexOf('gallery')
    search.splice(index, 1)
    const to = `${location.pathname}${search.length > 0 ? '?' + search.join('&') : ''}`
    navigate(to)
  }

  return <Modal isOpen={show} style={style} closeTimeoutMS={200}>
    <Container>
      <Button sx={{ px: 4, marginTop: 3, bg: 'white', color: 'text' }} onClick={closeGallery}>
        <Icon icon='ChevronLeft' />
        <Text px={1}>Back</Text>
      </Button>
    </Container>
    <Gallery sections={buildSections(props)} />
  </Modal>
}

export default GalleryModal
