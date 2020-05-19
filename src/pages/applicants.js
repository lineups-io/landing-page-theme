import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'gatsby-theme-core/src/components/Helmet'
import { PageContext } from 'gatsby-theme-core/src/components/PageContext'
import Layout from 'gatsby-theme-atomic-design/src/templates/Blank'

import ApartmentPicker from '../components/ApartmentPicker'

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

const Page = props => {
  const { lineups, ...images } = props.data
  const { site, apartments } = lineups

  return <PageContext.Provider value={{ site }}>
      <Helmet title='Rockstar Online Application' />
      <Layout {...site}>
        <ApartmentPicker
          h1='Welcome Future Neighbors.'
          cards={cards}
          apartments={apartments.items}
          {...images}
        />
      </Layout>
  </PageContext.Provider>
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
