import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import dayjs from 'dayjs'

import Layout from 'gatsby-theme-atomic-design/src/templates/Blank'
import Helmet from 'gatsby-theme-atomic-design/src/organisms/Helmet'
import { toQueryString } from 'gatsby-theme-atomic-design/src/helpers'

const Container = styled.div`
  min-height: 969px;
`

const Page = ({ pageContext, data, location }) => {
  const { site } = data.lineups

  const title = 'Online Leasing'
  const trackingData = { title, page: location.pathname }

  const qs = {
    'ContainerId': 'OllrDiv',
    'siteId': pageContext.siteId,
    'SearchUrl': location.pathname,
    'MoveInDate': dayjs().format('MM/DD/YYYY'),
    'OLL-source-attribution': 'Website',
  }

  return <>
    <Helmet title={title}>
      <meta http-equiv='X-UA-Compatible' content='IE=Edge' />
      <meta name='viewport' content='width=device-width,initial-scale=1,user-scalable=no' />
      <script
        type='text/javascript'
        src={`https://leasing.realpage.com/ollr/widgetLoader.js?${ toQueryString(qs) }`}
        ></script>
    </Helmet>
    <Layout trackingData={trackingData} {...site}>
      <Container id='OllrDiv' />
    </Layout>
  </>
}

export const query = graphql`
  query getRealPageOnlineLeasingPageData($account: ID!) {
    lineups {
      site: getAccountById(id: $account) {
          ...NavFields
          ...FooterFields
      }
    }
  }
`

export default Page
