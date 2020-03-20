import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'gatsby-theme-core/src/components/Helmet'
import { PageContext } from 'gatsby-theme-core/src/components/PageContext'
import ThemeProvider from 'gatsby-theme-core/src/components/Theme'
import Layout from 'gatsby-theme-core/src/components/Layout'

import ApartmentPicker from '../components/ApartmentPicker'

const cards = [
  {
    title: 'Stay Connected With Rockstar Capital',
    image: 'rockstarCares',
    body: `
      Subscribe to our YouTube channel and stay
      connected with everything we do.
    `,
    link: {
      href: 'https://www.youtube.com/playlist?list=PL7EjgErrsszXApWfPF0wALV76cs0kWq8C',
      children: 'Learn More',
    },
  },
  {
    title: 'Resident Portal',
    image: 'portal',
    body: `
      Schedule rent payments, submit maintenance requests,
      renew your lease, and more.
    `,
  },
  {
    title: 'Feedback',
    image: 'feedback',
    body: 'Question, comment ... we want to know.',
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
    <ThemeProvider>
      <Helmet title='Rockstar Resident Portal - Pay Rent, Submit Service Request & More' />
      <Layout>
        <ApartmentPicker
          h1='Welcome Neighbors.'
          cards={cards}
          apartments={apartments.items}
          {...images}
        />
      </Layout>
    </ThemeProvider>
  </PageContext.Provider>
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
