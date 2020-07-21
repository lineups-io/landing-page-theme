import React from 'react'
import GatsbyImage from 'gatsby-image'

import Container from 'gatsby-theme-atomic-design/src/atoms/Container'
import Row from 'gatsby-theme-atomic-design/src/atoms/Row'
import Dropdown from 'gatsby-theme-atomic-design/src/molecules/Dropdown'
import MenuItem from 'gatsby-theme-atomic-design/src/atoms/Dropdown/MenuItem'
import Link from 'gatsby-theme-atomic-design/src/atoms/Link'

import CardBody from 'gatsby-theme-atomic-design/src/atoms/ApartmentCard/Body'
import CardTitle from 'gatsby-theme-atomic-design/src/atoms/ApartmentCard/Heading'
import CardButtonGroup from 'gatsby-theme-atomic-design/src/atoms/ApartmentCard/ButtonGroup'
import Button from 'gatsby-theme-atomic-design/src/atoms/Button/Button'

import Banner from '../Banner'

import {
  DropdownRow,
  DropdownContainer,
  CardContainer,
  Header,
  Description,
  CardText,
  CardImage
} from './styled.js'

const ApartmentPicker = ({ cards, h1, apartments = [], ...images }) => {
  return <>
    <Banner />
    <Container>
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
          <CardImage>
            {images[card.image] && images[card.image].childImageSharp
              ? <GatsbyImage fluid={images[card.image].childImageSharp.fluid} />
              : null}
          </CardImage>
          <CardBody>
            <CardTitle as='h3'>{card.title}</CardTitle>
            <CardText>{card.body}</CardText>
            <CardButtonGroup>
              {card.link
                ? <Button as={Link} type='secondary' {...card.link} />
                : null}
            </CardButtonGroup>
          </CardBody>
        </CardContainer>)}
      </Row>
    </Container>
  </>
}

export default ApartmentPicker
