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
    title: 'Stay Connected With Rockstar Capital',
    image: 'rockstarCares',
    body: `
      Follow us on your favorite social media
      platform for daily content where you can
      join Rockstar Capital’s journey to the top!
      For an even closer look, check out our Youtube channel!
    `,
    link: {
      href: 'https://www.youtube.com/playlist?list=PL7EjgErrsszXApWfPF0wALV76cs0kWq8C',
      children: 'Learn More',
    },
  },
  {
    title: 'Feedback',
    image: 'feedback',
    body:  'Any questions, comments, or concerns? We want to hear it! The Rockstar Team is standing by 24/7 to help assist you!',
    link: {
      href: 'contact-us',
      children: 'Tell Us Here',
    },
  },
]

const Page = ({ data, location }) => {
  const { lineups, ...images } = data
  const { site, apartments } = lineups

  const title = 'Rockstar Resident Portal - Pay Rent, Submit Service Request & More'
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
    rockstarCares: file(relativePath: { eq: "residents/rockstar-cares.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
    portal: file(relativePath: { eq: "residents/portal.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
    feedback: file(relativePath: { eq: "residents/feedback.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
  }
`

export default Page
