import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'gatsby-theme-atomic-design/src/organisms/Helmet'

import ContactForm from 'gatsby-theme-atomic-design/src/templates/ContactForm'

const feedbackTypes = [
  'I have a question/comment about a community',
  'I have a question/comment for Headway',
  'I\'m interested in becoming a vendor',
  'I\'m a resident with a question',
  'Other',
]

const Page = ({ data, location }) => {
  const { site, apartments } = data.lineups

  const title = 'Contact Us'
  const trackingData = { title, page: location.pathname }

  return <>
      <Helmet title={title} />
      <ContactForm
        trackingData={trackingData}
        site={site}
        apartments={apartments.items}
        background={data.background}
        feedbackTypes={feedbackTypes}
      />
  </>
}

export const query = graphql`
  query getContactUsPageData($account: ID!) {
    lineups {
      site: getAccountById(id: $account) {
          ...NavFields
          ...FooterFields
      }
      apartments: findApartments(filter: { account: $account } sort: [["name", "1"]]) {
        count
        items {
          name
          email
        }
      }
    }
    background: file(relativePath: { eq: "contact-us/background.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1600 cropFocus: CENTER) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default Page
