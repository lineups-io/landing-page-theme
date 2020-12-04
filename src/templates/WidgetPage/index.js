import React from 'react'
import { graphql } from 'gatsby'
import { HashRouter, Switch } from 'react-router-dom'

import Theme from 'gatsby-theme-atomic-design/src/atoms/Theme'

import Container from './Container'
import Routes from './Routes'

import './index.css'

export default ({ data }) => {
  const {
    styles,
    slides,
    info,
  } = data.admin.widget

  return <Theme theme={styles}>
    <Container>
      <HashRouter>
        <Switch>
          <Routes {...slides} info={info} />
        </Switch>
      </HashRouter>
    </Container>
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
        styles: result {
          ...WidgetStylesFragment
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
    apartment {
      prospectPhoneNumber
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
      emailTo
      emailCc
      floorplansWebsiteUrl
    }
    communicationPreferences {
      question
      options
    }
    checkpoints {
      checkpoint1
      checkpoint2
      checkpoint3
    }
    intro {
      status
      question
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
    moveInDate {
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
    floorplanStories {
      amenity
      heading
      subHeading
      mediaIds
    }
    communityAmenities {
      status
      question
      minChoices: minCount
      maxChoices: maxCount
      columns
      options
    }
    communityStories {
      amenity
      heading
      subHeading
      mediaIds
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

  fragment WidgetStylesFragment on Admin_Widget {
    default {
      backgroundColor
      borderColor
      color
    }
    fab {
      backgroundColor
      borderColor
      color
      fontSize
    }
    primary {
      backgroundColor
      borderColor
      color
    }
    secondary {
      backgroundColor
      borderColor
      color
    }
    selected {
      backgroundColor
      borderColor
      color
    }
    unselected {
      backgroundColor
      borderColor
      color
    }
    disabled {
      backgroundColor
      borderColor
      color
    }
  }
`
