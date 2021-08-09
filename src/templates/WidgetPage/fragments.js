import { graphql } from 'gatsby'

export const fragments = graphql`
  fragment WidgetDefaultFragment on Admin_Widget {
    _id
    createdAt
    userId
    status
    title
    description
    privacyPolicyUrl
    apartment {
      _id
      name
      prospectPhoneNumber
      floorPlanUrl
      externalDataSource {
        id
      }
      externalData {
        timezone
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
      businessHours {
        day
        openTime
        closeTime
      }
    }
    account {
      name
      theme
    }
  }

  fragment WidgetSlidesFragment on Admin_Widget {
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
    intro {
      status
      heading
      poster
      video
      closedCaptions
    }
    bedrooms {
      status
      question
      minChoices: minCount
      maxChoices: maxCount
      columns
      options
    }
    schoolTerms {
      status
      question
      minChoices: minCount
      maxChoices: maxCount
      columns
      options
    }
    floorplanAmenities {
      status
      question
      minChoices: minCount
      maxChoices: maxCount
      columns
      options
    }
    communityAmenities {
      status
      question
      minChoices: minCount
      maxChoices: maxCount
      columns
      options
    }
    story {
      data
    }
    neighborhoodFeatures {
      status
      question
      minChoices: minCount
      maxChoices: maxCount
      columns
      options
    }
  }
`
