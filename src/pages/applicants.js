import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'gatsby-theme-atomic-design/src/organisms/Helmet'
import Layout from 'gatsby-theme-atomic-design/src/templates/Blank'

import ApartmentPicker from '../components/ApartmentPicker'

const cards = [
  {
    title: 'Renters Insurance',
    image: 'insurance',
    body: `
      Protect yourself and your belongings by enrolling
      in a renter's insurance policy.
    `,
    link: {
      href: 'https://www.insureyourstuff.com/quote/quoteStep2.aspx?cid=109',
      children: 'Learn More',
    },
  },
  {
    title: 'Online Leasing',
    image: 'portal',
    body: 'View available apartments and lease online.',
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

const Page = ({ data, location }) => {
  const { lineups, ...images } = data
  const { site, apartments } = lineups

  const title = 'Online Application'
  const trackingData = { title, page: location.pathname }

  return <>
      <Helmet title={title}>
        <meta name='description' content={`
          List of online application links to all SRG apartment communities.
          Start an online application or pick up where you left off.
          Life made simple starts at SRGLiving.com.
        `} />
      </Helmet>
      <Layout trackingData={trackingData} {...site}>
        <ApartmentPicker
          h1='Welcome Future Neighbors.'
          cards={cards}
          apartments={apartments.items}
          {...images}
        />
      </Layout>
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
    insurance: file(relativePath: { eq: "residents/insurance.jpg" }) {
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
