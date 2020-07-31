import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'gatsby-theme-atomic-design/src/organisms/Helmet'

import ApartmentPicker from 'gatsby-theme-atomic-design/src/templates/ApartmentPicker'

const cards = [
  {
    title: 'Resident Portal',
    image: 'portal',
    body: `
      Schedule rent payments, submit maintenance requests,
      renew your lease, and more.
      Use the form above to log into your resident portal!
    `,
  },
  {
    title: 'Feedback',
    image: 'feedback',
    body:  'Any questions, comments, or concerns? We want to hear it!',
    link: {
      href: 'contact-us',
      children: 'Tell Us Here',
    },
  },
]

const Page = ({ data, location }) => {
  const { lineups, ...images } = data
  const { site, apartments } = lineups

  const title = 'Resident Portal - Pay Rent, Submit Service Request & More'
  const trackingData = { title, page: location.pathname }

  return <>
      <Helmet title={title} />
      <ApartmentPicker
        trackingData={trackingData}
        site={site}
        h1='Welcome Neighbors.'
        cards={cards}
        apartments={apartments.items}
        {...images}
      />
  </>
}

export const query = graphql`
  query getResidentsPageData($account: ID!) {
    lineups {
      site: getAccountById(id: $account) {
          ...NavFields
          ...FooterFields
      }
      apartments: findApartments(filter: { account: $account } sort: [["name", "1"]]) {
        count
        items {
          name
          url: residentPortalUrl
        }
      }
    }
    portal: file(relativePath: { eq: "residents/portal.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 850 maxHeight: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    feedback: file(relativePath: { eq: "residents/feedback.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 850 maxHeight: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default Page
