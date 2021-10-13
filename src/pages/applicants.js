import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'gatsby-theme-atomic-design/src/organisms/Helmet'

import ApartmentPicker from 'gatsby-theme-atomic-design/src/templates/ApartmentPicker'

const cards = [
  {
    title: 'Online Leasing',
    image: 'portal',
    body: 'View available apartments and lease online. Use the form above to start your application now!',
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
      href: 'https://www.youtube.com/channel/UCwlPBGDHoWQcFY__F2grshQ/featured',
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

  const title = 'Rockstar Online Application'
  const trackingData = { title, page: location.pathname }

  return <>
      <Helmet title={title} />
      <ApartmentPicker
        trackingData={trackingData}
        site={site}
        h1='Welcome Future Neighbors.'
        cards={cards}
        apartments={apartments.items}
        {...images}
      />
  </>
}

export const query = graphql`
  query getApplicantsPageData($account: ID!) {
    lineups {
      site: getAccountById(id: $account) {
          ...NavFields
          ...FooterFields
      }
      apartments: findApartments(filter: { account: $account } sort: [["name", "1"]]) {
        count
        items {
          name
          url: onlineLeasingUrl
        }
      }
    }
    rockstarCares: file(relativePath: { eq: "residents/rockstar-cares.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 850 height: 500)
      }
    }
    portal: file(relativePath: { eq: "residents/portal.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 850 height: 500)
      }
    }
    feedback: file(relativePath: { eq: "residents/feedback.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 850 height: 500)
      }
    }
  }
`

export default Page
