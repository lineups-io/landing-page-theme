import React, { useState } from 'react'
import GatsbyImage from 'gatsby-image'

import { Container, Row } from 'gatsby-theme-core/src/components/Layout/styled'
import Card from 'gatsby-theme-landing-page/src/templates/LandingPage/Card/styled'
import Dropdown from 'gatsby-theme-core/src/components/Dropdown'

import {
  DropdownRow,
  DropdownContainer,
  CardContainer,
  Header,
  Description,
} from './styled.js'

const ApartmentPicker = ({ cards, h1, apartments = [], ...images }) => {
  const [show, setShow] = useState()

  return <Container>
    <Header>{h1}</Header>
    <Description>
      Select your community below.
    </Description>
    <DropdownRow>
      <DropdownContainer>
        <Dropdown onClose={() => setShow(false)}>
          <Dropdown.Toggle onClick={() => setShow(!show)}>
            Select Apartment
          </Dropdown.Toggle>
          <Dropdown.Menu show={show}>
            {apartments.filter(apartment => apartment.url)
              .map((apartment, i) =>
                <Dropdown.Item key={i} href={apartment.url}>
                  {apartment.name}
                </Dropdown.Item>
              )
            }
          </Dropdown.Menu>
        </Dropdown>
      </DropdownContainer>
    </DropdownRow>
    <Row>
      {cards.map((card, i) => <CardContainer key={i}>
        {images[card.image] && images[card.image].childImageSharp
          ? <GatsbyImage fluid={images[card.image].childImageSharp.fluid} />
          : null}
        <Card.Body>
          <Card.Title>{card.title}</Card.Title>
          <Card.Address>{card.body}</Card.Address>
          <Card.Fill />
          {card.link
            ? <Card.Button type='primary' {...card.link} />
            : null}
        </Card.Body>
      </CardContainer>)}
    </Row>
  </Container>
}

export default ApartmentPicker
