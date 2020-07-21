import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import GatsbyImage from 'gatsby-image'
import sortBy from 'lodash.sortby'

import { Container, Card, Caption } from './styled'

export default props => {
  const data = useStaticQuery(graphql`
    query getMarketsData {
      images: allFile(filter:{ relativePath: { regex: "^markets/" }}) {
        edges {
          node {
            name
            childImageSharp {
              fluid(maxWidth: 725 maxHeight: 425 cropFocus: CENTER) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)

  const markets = props.markets.map(market => {
    const title = market.title.replace(/ /g, '-').toLowerCase()
    return {
      ...market,
      image: data.images.edges.find(edge => edge.node.name === title),
    }
  }).filter(m => m.image)

  return <Container>
    {sortBy(markets, 'title').map((market, i) =>
      <Card key={i}
        href={market.marketPage && market.marketPage.slug}
      >
        <GatsbyImage fluid={market.image.node.childImageSharp.fluid} />
        <Caption>{market.title}</Caption>
      </Card>
    )}
  </Container>
}
