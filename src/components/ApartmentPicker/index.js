import React from 'react'
import GatsbyImage from 'gatsby-image'

import Card from 'gatsby-theme-landing-page/src/templates/LandingPage/Card/styled'
import Container from 'gatsby-theme-atomic-design/src/atoms/Container'
import Row from 'gatsby-theme-atomic-design/src/atoms/Row'
import Dropdown from 'gatsby-theme-atomic-design/src/molecules/Dropdown'
import MenuItem from 'gatsby-theme-atomic-design/src/atoms/Dropdown/MenuItem'
import Link from 'gatsby-theme-atomic-design/src/atoms/Link'

import {
  DropdownRow,
  DropdownContainer,
  CardContainer,
  Header,
  Description,
} from './styled.js'

const ApartmentPicker = ({ cards, h1, apartments = [], ...images }) => {
  return <Container>
    <Header>{h1}</Header>
    <Description>
      Select your community below.
    </Description>
    <DropdownRow>
      <DropdownContainer>
        <Dropdown selected='Select Apartment'>
            {apartments.filter(apartment => apartment.url)
              .map((apartment, i) =>
              <MenuItem key={i}>
                <Link href={apartment.url}>{apartment.name}</Link>
              </MenuItem>
              )
            }
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
