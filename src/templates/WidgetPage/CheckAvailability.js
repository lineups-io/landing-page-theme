import React from 'react'

import Container from 'gatsby-theme-atomic-design/src/atoms/VideoWidget/Container'
import Header from 'gatsby-theme-atomic-design/src/atoms/MultipleChoiceQuestion/Header'
import Main from 'gatsby-theme-atomic-design/src/atoms/MultipleChoiceQuestion/Main'
import Title from 'gatsby-theme-atomic-design/src/atoms/MultipleChoiceQuestion/Title'

import Floorplan from 'gatsby-theme-atomic-design/src/templates/Floorplan'

const CheckAvailability = ({
  NavLeft,
  title = 'Our Floorplans',
  ...props
}) =>
    <Container>
      {NavLeft && (
        <Header>
          <NavLeft />
        </Header>
      )}

      <Main>
        <Title>{title}</Title>
        <Floorplan {...props} />
      </Main>
    </Container>

export default CheckAvailability
