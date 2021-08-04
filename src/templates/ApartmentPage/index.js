import React from 'react'
import { graphql } from 'gatsby'
import createHash from 'sha.js'

import Helmet  from 'gatsby-theme-atomic-design/src/organisms/Helmet'
import Layout from 'gatsby-theme-atomic-design/src/templates/QuickView'
import JsonLd from './JsonLd'

import useEntrata from '../../hooks/useEntrata'

const App = ({ data, location, pageContext }) => {
  const { apartment, site } = data.lineups
  const { seo = {} } = apartment

  const title = seo ? seo.title : apartment.name
  const trackingData = { title, page: location.pathname, apartment: apartment.name }

  const {
    scheduleTimes,
    onSubmit,
  } = useEntrata(apartment.externalDataSource.id, apartment.externalData.timezone)

  const [widget] = data.admin.apartment.result.widgets
  const props = {
    scheduleTimes,
    onSubmit: form => onSubmit(form).then(res => {
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

      if (widget && widget.scheduleTour && day && time) {
        return fetch('/.netlify/functions/send-schedule-tour-alert', {
          method: 'POST',
          body: JSON.stringify({
            ...widget.scheduleTour,
            apartment: {
              name: apartment.name,
            },
            user: {
              firstName,
              lastName,
              email,
              phone,
            },
            'schedule-tour': {
              day: day.value,
              time: time.value,
            },
          }),
        })
      } else if (widget && widget.contactUs && question) {
        return fetch('/.netlify/functions/send-contact-us-alert', {
          method: 'POST',
          body: JSON.stringify({
            ...widget.contactUs,
            apartment: {
              name: apartment.name,
            },
            user: {
              firstName,
              lastName,
              email,
              phone,
            },
            'contact-us': {
              question,
            },
            question: `${ firstName } asked this question: ${ question }`,
          }),
        })
      } else {
        return res
      }
    })
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
