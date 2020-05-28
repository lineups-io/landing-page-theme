import React from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'

import Background from 'gatsby-theme-atomic-design/src/atoms/Background'
import Container from 'gatsby-theme-atomic-design/src/atoms/Container'
import Row from 'gatsby-theme-atomic-design/src/atoms/Row'
import Col from 'gatsby-theme-atomic-design/src/atoms/Col'
import List from 'gatsby-theme-atomic-design/src/atoms/List'
import ListItem from 'gatsby-theme-atomic-design/src/atoms/ListItem'
import Heading from 'gatsby-theme-atomic-design/src/atoms/Typography/Heading'

const getActiveSpecials = specials =>
  specials.filter(special => special.isActive && dayjs().isBetween(specials.startDate, specials.endDate, 'day', '[]'))

const SpecialsBanner = styled(Background).attrs({
  type: 'tertiary',
})`
  ${ Col }:first-child {
    flex: 0;
  }

  ${ Col }:first-child ${ Heading } {
    font-family: 'Kaushan Script';
    color: ${ props => props.theme.colors.secondary };
    text-transform: uppercase;
    font-weight: 600;
    margin: 0;
  }

  ${ ListItem } {
    display: flex;
    flex-direction: column;
  }

  span${ Heading } {
    font-size: 1.1em;
    font-weight: 700;
    margin: 0;
  }
`

export default ({ specials }) => {
  const activeSpecials = getActiveSpecials(specials)
  return activeSpecials.length > 0 ?
    <SpecialsBanner>
      <Container>
        <Row>
          <Col>
            <Heading as='h3'>Current Specials</Heading>
          </Col>
          <Col>
            <List>
              {activeSpecials.map((special, i) =>
                <ListItem key={i}>
                  <Heading as='span'>{special.title}</Heading>
                  <span>{special.description}</span>
                </ListItem>
              )}
            </List>
          </Col>
        </Row>
      </Container>
    </SpecialsBanner> : null
}
