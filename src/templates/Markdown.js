import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'gatsby-theme-atomic-design/src/organisms/Helmet'
import Layout from 'gatsby-theme-atomic-design/src/templates/Markdown'

const Page = ({ data, location }) => {
  const { md } = data

  const context = {
    ...location,
    site: data.lineups.site,
    title: md.frontmatter.title,
  }
  const title = md.frontmatter.title
  const trackingData = { title, page: location.pathname }

  return <>
    <Helmet title={context.title} />
    <Layout trackingData={trackingData} {...data.lineups.site} source={md.rawMarkdownBody} />
  </>
}

export const query = graphql`
  query getMarkdownPageData($path: String! $account: ID!) {
    lineups {
      site: getAccountById(id: $account) {
          ...NavFields
          ...FooterFields
      }
    }
    md: markdownRemark(frontmatter: { path: { eq: $path } }) {
      rawMarkdownBody
      frontmatter {
        title
      }
    }
  }
`

export default Page
