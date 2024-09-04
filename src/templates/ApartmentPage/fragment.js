import { graphql } from 'gatsby'

export const fragments = graphql`
  fragment WidgetFields on Admin_Widget {
    _id
    title
    status
    showOnWebsite
    intro {
      poster
      video
    }
    guestCard {
      vendor
      vendorPropertyId
      emailTo
      emailCc
    }
    contactUs {
      vendor
      vendorPropertyId
      emailTo
      emailCc
    }
    scheduleTour {
      vendor
      vendorPropertyId
      emailTo
      emailCc
    }
  }

  fragment ApartmentFields2 on Lineups_Apartment {
    _id
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
        ...BreadcrumbFields
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
    businessHours {
      day
      openTime
      closeTime
    }
    amenities {
      icon
      type
      title
      description
      isFeatured
      isPublished
    }
    specials {
      showOnWebsite
      isActive
      title
      description
      footer
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
      src: url
      alt
    }
    carousel: landingPageCarousel {
      src: url
      alt
    }
    tour {
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
    longDescription
    features: uniqueSellingPoints {
      icon: fontAwesome
      title
      description
    }
    neighborhood {
      description
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
      floorplanAvailabilityUrl: floorPlanAvailabilityUrl
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
      timezone
      officeHours {
        day
        openTime
        closeTime
      }
      amenities {
        type
        title
        description
        isFeatured
        isPublished
      }
      specials {
        showOnWebsite
        isActive
        title
        description
        footer
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
`
