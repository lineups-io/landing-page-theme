import React from 'react'
import { graphql } from 'gatsby'
import createHash from 'sha.js'
import { useTracking } from 'react-tracking'

import Helmet  from 'gatsby-theme-atomic-design/src/organisms/Helmet'
import Layout from 'gatsby-theme-atomic-design/src/templates/QuickView'
import JsonLd from './JsonLd'
import Widget from './Widget'
import GalleryModal from './GalleryModal'

import useLeadManager from '../../hooks/useLeadManager'
import useLocalStorage from '../../hooks/useLocalStorage'
import { ID } from '../../hooks/utils'

const App = ({ data, location, pageContext, navigate }) => {
  const [store] = useLocalStorage('store', { user: {} })

  const { apartment, site } = data.lineups
  const { seo = {} } = apartment

  const title = seo ? seo.title : apartment.name
  const trackingData = { title, page: location.pathname, apartment: apartment.name }

  const dispatchOnMount = () => {
    return {
      event: 'custom.page.load',
      siteType: 'brand site',
      pageType: 'quick view',
      apartment: apartment.name,
      market: apartment.primaryMarket.market || '(not set)',
      submarket: apartment.primaryMarket.submarket || '(not set)',
    }
  }

  const { trackEvent } = useTracking({}, { dispatchOnMount })

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
    openPhotoGallery: () => {
      const to = `${location.pathname}${location.search ? location.search + '&gallery' : '?gallery'}`
      navigate(to)
    },
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

      const emailHash = email && createHash('sha1').update(email).digest('base64')
      trackEvent({
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

      trackEvent({
        event: 'custom.form.submit',
        action: 'submit',
        tour: {
          day: day && day.value,
          time: time && time.value,
        },
        hashedEmail: emailHash,
        hashedPhone: phone && createHash('sha1').update(phone).digest('base64'),
        userId: user.id,
      })

      if (day && time) {
        return submitScheduleTour({
          user,
          day,
          time,
          'schedule-tour': {
            day: day && day.value,
            time: time && time.value,
          },

        }).then(({ response }) => {
          trackEvent({
            event: 'custom.form.complete',
            action: 'complete',
            crmId: response.code === 200
              ? response.result.prospects.prospect[0].applicationId
              : undefined,
          })
        })
      } else if (question) {
        return submitContactUs({
          user,
          'contact-us': {
            question,
          },
          question: `${ firstName } asked this question: ${ question }`,

        }).then(({ response }) => {
          trackEvent({
            event: 'custom.form.complete',
            action: 'complete',
            crmId: response.code === 200
              ? response.result.prospects.prospect[0].applicationId
              : undefined,
          })
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
        <GalleryModal {...apartment} />
        {widget ? <Widget {...widget} /> : null}
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
