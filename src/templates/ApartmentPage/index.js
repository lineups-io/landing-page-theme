import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'

import Helmet  from 'gatsby-theme-atomic-design/src/organisms/Helmet'
import Layout from 'gatsby-theme-atomic-design/src/templates/QuickView'
import JsonLd from './JsonLd'

import { getDates } from '../WidgetPage/utils'

const App = ({ data, location }) => {
  const [scheduleTimes, setScheduleTimes] = useState([])
  const [duration, setDuration] = useState(30)
  const { apartment, site } = data.lineups
  const { seo = {} } = apartment

  const title = seo ? seo.title : apartment.name
  const trackingData = { title, page: location.pathname, apartment: apartment.name }

  useEffect(() => {
    fetch('/.netlify/functions/entrata-get-appointment-times', {
      method: 'POST',
      body: JSON.stringify({ propertyId: apartment.externalDataSource.id }),
    })
      .then(res => res.json())
      .then(json => {
        const appointmentLength = json.result.propertyCalendarSettings.appointmentLength || 30
        setDuration(appointmentLength)

        const { availableHour = [] } = json.result.propertyCalendarAvailability.availableHours
        setScheduleTimes(getDates(availableHour, appointmentLength))
      })
  }, [])

  const props = {
    scheduleTimes,
    sendLead: form =>
      fetch('/.netlify/functions/entrata-send-lead', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          duration,
          propertyId: apartment.externalDataSource.id,
        }),
      }),
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
          widgets {
            _id
            title
            status
            intro {
              poster
              video
            }
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
        name
        marketingWebsiteUrl
        logo {
          src: url
          alt
        }
        primaryMarket {
          market
          state {
            name
          }
          marketPage {
            slug
          }
        }
        googlePlaceId
        address {
          line1
          city
          state
          postalCode
        }
        coordinates {
          latitude: lat
          longitude: lng
        }
        priceSummary {
          bedrooms
          min {
            effectiveRent {
              min
            }
          }
          max {
            effectiveRent {
              min
            }
          }
        }
        telephone: prospectPhoneNumber
        residentPortalUrl
        onlineLeasingUrl
        awardsPhoto {
          mediaType
          src: url
          alt
        }
        defaultPhoto {
          mediaType
          src: url
          alt
        }
        mediaGallery {
          mediaType
          src: url
          alt
        }
        playlist {
          mediaType
          src: url
          alt
        }
        seo {
          title
          description
        }
        headline: shortDescription {
          description: title
          shortDescription: description
        }
        features: uniqueSellingPoints {
          icon: fontAwesome
          title
          description
        }
        neighborhood {
          description
          features {
            icon: fontAwesome
            title
            description
          }
        }
        prospectPortalUrl
        selfGuidedTourUrl
        externalDataSource {
          vendor
          id
        }
        floorPlanUrl
        floorplanVirtualTours {
          name
          summary
          thumbnail {
            mediaType
            src: url
            alt
          }
          src: url
        }
        communityVirtualTours {
          name
          summary
          thumbnail {
            mediaType
            src: url
            alt
          }
          src: url
        }
        floorplans {
          id
          floorplan: name
          bedrooms
          bathrooms
          squareFeet {
            min
          }
          floorPlanAvailabilityUrl
          units {
            id
            effectiveRent {
              min
            }
            dateAvailable
            unitAvailabilityUrl
          }
          images: media {
            src: url
            alt
            title
            tags
          }
        }
        externalData {
          shortDescription
          longDescription
          officeHours {
            Day: day
            OpenTime: openTime
            CloseTime: closeTime
          }
          amenities {
            type
            title
            description
            isFeatured
            isPublished
            icon: fontAwesome
          }
          specials {
            isActive
            title
            description
            footer
            startDate
            endDate
          }
        }
        nearbyCommunities: nearby(limit: 3) {
          ...ApartmentFields
        }
        social {
          icon: fontAwesome
          url: title
        }
      }
    }
  }
`

export default App
