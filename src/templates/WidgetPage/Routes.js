import React from 'react'
import { Route } from 'react-router-dom'

import VideoPlayer from 'gatsby-theme-atomic-design/src/templates/VideoPlayer'
import MultipleChoiceQuestion from 'gatsby-theme-atomic-design/src/templates/MultipleChoiceQuestion'
import GuestCard from 'gatsby-theme-atomic-design/src/templates/GuestCard'
import Spinner from 'gatsby-theme-atomic-design/src/templates/Spinner'
import ScheduleTour from 'gatsby-theme-atomic-design/src/templates/ScheduleTour'
import ContactUs from 'gatsby-theme-atomic-design/src/templates/ContactUs'
import Confirmation from 'gatsby-theme-atomic-design/src/templates/Confirmation'

import useNavigate from './useNavigate.js'
import useAutosuggest from './useAutosuggest.js'
import NavLeft from './NavLeft'
import NavRight from './NavRight'

import lottie from './lottie.json'

const Routes = ({ intro, bedrooms, moveInDate, floorplanAmenities, communityAmenities, contactUs }) => {
  const navigate = useNavigate()
  const floorplanAutosuggest = useAutosuggest()
  const communityAutosuggest = useAutosuggest()

  const transform = (path, { options, ...obj }, next) => obj.status !== 'hidden' ? ({
    path,
    component: MultipleChoiceQuestion,
    ...obj,
    NavLeft: () => <NavLeft onClick={() => navigate(-1)} />,
    NavRight: () => obj.status === 'optional' && next ? <NavRight onClick={() => navigate(next)} /> : null,
    options: options.filter(option => option.active),
    onSubmit: data => navigate(next, data),
  }) : undefined

  const routes = [
    {
      path: '/',
      component: VideoPlayer,
      ...intro,
      sources: [
        {
          src: intro.video,
          type: `video/${ intro.video.split('.').splice(-1) }`,
        }
      ],
      tracks: [
        {
          kind: 'captions',
          srcLang: 'en',
          label: 'English',
          src: intro.closedCaptions,
         }
      ],
      onBeginTour: () => navigate('/bedrooms'),
      onScheduleTour: () => navigate('/schedule-tour'),
    },
    transform('/bedrooms', bedrooms, '/move-in'),
    transform('/move-in', moveInDate, '/floorplan-amenities'),
    {
      ...transform('/floorplan-amenities', floorplanAmenities, '/community-amenities'),
      autoSuggest: floorplanAutosuggest,
      onAutocomplete: console.debug,
    },
    {
      ...transform('/community-amenities', communityAmenities, '/guest-card'),
      autoSuggest: communityAutosuggest,
      onAutocomplete: console.debug,
    },
    {
      path: '/guest-card',
      component: GuestCard,
      // TODO: load values from cookies
      name: '',
      email: '',
      phone: '',
      title: 'To help us personalize the experience, tell us a little about you',
      onSubmit: data => navigate('/loading', data),
      privacyPolicyUrl: '//google.com',
    },
    {
      path: '/loading',
      component: Spinner,
      lottie,
      title: 'Give us a moment while we customize a tour for you!',
      onComplete: () => navigate('/schedule-tour'),
    },
    {
      path: '/schedule-tour',
      component: ScheduleTour,
      // TODO: load values from cookies
      email: '',
      phone: '',
      onSubmit: data => navigate('/schedule-tour-confirmation', data),
    },
    {
      path: '/schedule-tour-confirmation',
      component: Confirmation,
      lottie,
      title: 'Thank you for scheduling a tour!',
      subtitle: 'Looking forward to meeting you.',
      onStartOver: () => navigate('/'),
      onCall: () => console.log('onCall'),
      onContactUs: () => navigate('/contact-us'),
      onScheduleTour: () => navigate('/schedule-tour'),
    },
    {
      path: '/contact-us',
      component: ContactUs,
      // FIXME: contactUs.emailTo should be required
      to: contactUs.emailTo || 'lucas@lineups.io',
      // TODO: load values from cookies
      from : '',
      question: 'Have a question we have an answer?',
      onSubmit: data => navigate('/contact-us-confirmation', data),
    },
    {
      path: '/contact-us-confirmation',
      component: Confirmation,
      lottie,
      title: 'Thank you !!! Someone will be in touch soon.',
      onStartOver: () => navigate('/'),
      onCall: () => console.log('onCall'),
      onContactUs: () => navigate('/contact-us'),
      onScheduleTour: () => navigate('/schedule-tour'),
    },
  ]

  return routes.map(({ component: Component, path, ...props }, i) =>
    <Route key={i} exact path={path}>
      <Component {...props} />
    </Route>
  )
}

export default Routes
