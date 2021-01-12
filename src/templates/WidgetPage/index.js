import React from 'react'
import { graphql } from 'gatsby'
import { StaticRouter, HashRouter, Switch } from 'react-router-dom'

import Theme from 'gatsby-theme-atomic-design/src/atoms/Theme'

import Routes from './Routes'

import './index.css'

export default ({ data, location }) => {
  const {
    styles,
    slides,
    info,
  } = data.admin.widget

  const Router = typeof window === 'undefined' ? StaticRouter : HashRouter

  // TODO: update components to use styles
  return <Theme theme={styles}>
    <Router location={location}>
      <Switch>
        <Routes {...slides} info={info} />
      </Switch>
    </Router>
  </Theme>
}

export const query = graphql`
  query getWidgetPageData($id: String! $account: ID!) {
    lineups {
      site: getAccountById(id: $account) {
          ...NavFields
          ...FooterFields
          pricingDisclaimer
          banner
      }
    }
    admin {
      widget(input: { id: $id }) {
        info: result {
          ...WidgetDefaultFragment
        }
        slides: result {
          ...WidgetSlidesFragment
        }
      }
    }
  }

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
    }
    account {
      name
      theme
    }
  }

  fragment WidgetSlidesFragment on Admin_Widget {
    guestCard {
      emailTo
      emailCc
    }
    contactUs {
      emailTo
      emailCc
    }
    scheduleTour {
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
