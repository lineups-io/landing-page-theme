import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'gatsby-theme-atomic-design/src/organisms/Helmet'
import Layout from 'gatsby-theme-atomic-design/src/templates/Blank'

import ApartmentPicker from '../components/ApartmentPicker'

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
      <Helmet title='Rockstar Resident Portal - Pay Rent, Submit Service Request & More' />
      <Layout trackingData={trackingData} {...site}>
        <ApartmentPicker
          h1='Welcome Neighbors.'
          cards={cards}
          apartments={apartments.items}
          {...images}
        />
      </Layout>
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
        fluid(maxWidth: 850 maxHeight: 500) {
          ...GatsbyImageSharpFluid
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
