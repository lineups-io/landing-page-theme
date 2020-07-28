import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import GatsbyImage from 'gatsby-image/withIEPolyfill'

export default () => {
  const { logo } = useStaticQuery(graphql`
    query getNavLogo {
      logo: file(relativePath: { eq: "logo_colored.png" }) {
        childImageSharp {
          fixed(width: 150 height: 44 cropFocus: CENTER) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return <GatsbyImage fixed={logo.childImageSharp.fixed} />
}
