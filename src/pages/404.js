import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import Layout from 'gatsby-theme-atomic-design/src/templates/Blank'
import Helmet from 'gatsby-theme-atomic-design/src/organisms/Helmet'
import Heading from 'gatsby-theme-atomic-design/src/atoms/Typography/Heading'

const Placeholder = styled.div`
  text-align: center;
  margin-top: 60px;
  min-height: 500px;

  ${ Heading } {
   font-size: 4em;
  }

  p {
    font-size: 2em;
  }
`

const Page = props => {
  const { site } = props.data.lineups

  return <>
      <Helmet title='Page Not Found' />
      <Layout {...site}>
        <Placeholder>
          <Heading>404</Heading>
          <p>Page Not Found</p>
        </Placeholder>
      </Layout>
  </>
}

export const query = graphql`
  query get404PageData($account: ID!) {
    lineups {
      site: getAccountById(id: $account) {
          ...NavFields
          ...FooterFields
      }
    }
  }
`

export default Page
