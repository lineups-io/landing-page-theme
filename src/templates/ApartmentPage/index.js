import React from 'react'
import { graphql } from 'gatsby'
import createHash from 'sha.js'

import Helmet  from 'gatsby-theme-atomic-design/src/organisms/Helmet'
import Layout from 'gatsby-theme-atomic-design/src/templates/QuickView'
import JsonLd from './JsonLd'

import useLeadManager from '../../hooks/useLeadManager'
import useLocalStorage from '../../hooks/useLocalStorage'
import { ID } from '../../hooks/utils'

const App = ({ data, location, pageContext }) => {
  const [store] = useLocalStorage('store', { user: {} })

  const { apartment, site } = data.lineups
  const { seo = {} } = apartment

  const title = seo ? seo.title : apartment.name
  const trackingData = { title, page: location.pathname, apartment: apartment.name }

  const [widget] = data.admin.apartment.result.widgets
  const {
    scheduleTimes,
    submitContactUs,
    submitScheduleTour,
  } = useLeadManager({
    source: 'Quick View',
    apartment,
    ...widget,
  })
  const props = {
    scheduleTimes,
    onSubmit: form => {
      const {
        firstName,
        lastName,
        email,
        phone,
        question,
        day,
        time,
      } = form

      window.dataLayer = window.dataLayer || []
      const emailHash = email && createHash('sha1').update(email).digest('base64')
      window.dataLayer.push({
        event: 'quickview_lead',
        account: pageContext.account,
        apartment: apartment.name,
        user_email_hash: emailHash,
        question,
        tour_requested_day: day && day.value,
        tour_requested_time: time && time.value,
      })

      const user = {
        id: store.user.id || ID(),
        firstName,
        lastName,
        email,
        phone,
        emailHash,
      }

      if (day && time) {
        return submitScheduleTour({
          user,
          'schedule-tour': {
            day: day.value,
            time: time.value,
          },
        })
      } else if (question) {
        return submitContactUs({
          user,
          'contact-us': {
            question,
          },
          question: `${ firstName } asked this question: ${ question }`,
        })
      }
    }
  }

  return (
    <>
        <Helmet title={title}>
          <meta name='description' content={seo ? seo.description : ''} />
          <script type='application/ld+json'>{JSON.stringify(JsonLd(apartment))}</script>
        </Helmet>
        <Layout trackingData={trackingData} {...site} apartment={apartment} {...props} />
    </>
  )
}

export const query = graphql`
  query getApartmentPage($id: ID! $account: ID! $publicId: String) {
    admin {
      apartment(input: { filter: { publicId: { _eq: $publicId } } }) {
        result {
          widgets (status: "published") {
            ...WidgetFields
          }
        }
      }
    }
    lineups {
      site: getAccountById(id: $account) {
          ...NavFields
          ...FooterFields
      }
      apartment: getApartmentById(id: $id) {
        ...ApartmentFields2
      }
    }
  }
`

export default App
