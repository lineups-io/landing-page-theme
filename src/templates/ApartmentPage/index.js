import React from 'react'
import { graphql } from 'gatsby'

import Helmet  from 'gatsby-theme-atomic-design/src/organisms/Helmet'
import Layout from 'gatsby-theme-atomic-design/src/templates/Microsite'
import JsonLd from './JsonLd'
import Widget from './Widget'

const App = ({ data, location }) => {
  const { apartment, site } = data.lineups
  const { seo = {} } = apartment
  // FIXME: using first published widget which will not work if we have multiple
  const [widget] = data.admin.apartment.result.widgets.filter(w => w.status === 'published')

  const title = seo ? seo.title : apartment.name
  const trackingData = { title, page: location.pathname, apartment: apartment.name }

  return (
    <>
        <Helmet title={title}>
          <meta name='description' content={seo ? seo.description : ''} />
          <script type='application/ld+json'>{JSON.stringify(JsonLd(apartment))}</script>
        </Helmet>
        <Layout trackingData={trackingData} {...site} apartment={apartment} />
        {widget ? <Widget {...widget} /> : null}
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
        realPage {
          siteId
          wid
        }
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
        longDescription
        officeHours: businessHours {
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
