import React from 'react'
import { Route } from 'react-router-dom'

import VideoPlayer from 'gatsby-theme-atomic-design/src/templates/VideoPlayer'
import MultipleChoiceQuestion from 'gatsby-theme-atomic-design/src/templates/MultipleChoiceQuestion'
import GuestCard from 'gatsby-theme-atomic-design/src/templates/GuestCard'
import Spinner from 'gatsby-theme-atomic-design/src/templates/Spinner'
import ScheduleTour from 'gatsby-theme-atomic-design/src/templates/ScheduleTour'
import ContactUs from 'gatsby-theme-atomic-design/src/templates/ContactUs'
import Confirmation from 'gatsby-theme-atomic-design/src/templates/Confirmation'

import useLocalStorage from './useLocalStorage.js'
import useNavigate from './useNavigate.js'
import useAutosuggest from './useAutosuggest.js'
import NavLeft from './NavLeft'
import NavRight from './NavRight'

import loading from './loading.json'
import confirmation from './confirmation.json'

const formatPhone = str => `tel:+1${ str.replace(/\D/g, '') }`

const Routes = ({
  info,
  intro,
  bedrooms,
  moveInDate,
  floorplanAmenities,
  communityAmenities,
  neighborhoodFeatures,
  contactUs,
}) => {
  const [store, setStore] = useLocalStorage('store', { user: {} })
  const updateStore = (location, data = {}) => {
    const key = location.pathname.replace(/^\//, '') || 'index'
    setStore({
      ...store,
      user: {
        firstName: data.firstName || store.user.firstName,
        lastName: data.lastName || store.user.lastName,
        email: data.email || store.user.email,
        phone: data.phone || store.user.phone,
      },
      [key]: data,
    })
  }

  const navigate = useNavigate(updateStore)
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

  const onCall = () => window.open(formatPhone(info.apartment.prospectPhoneNumber))

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
      ...transform('/community-amenities', communityAmenities, '/neighborhood-features'),
      autoSuggest: communityAutosuggest,
      onAutocomplete: console.debug,
    },
    transform('/neighborhood-features', neighborhoodFeatures, '/guest-card'),
    {
      path: '/guest-card',
      component: GuestCard,
      ...store.user,
      title: 'To help us personalize the experience, tell us a little about you',
      onSubmit: data => navigate('/loading', data),
      privacyPolicyUrl: '//google.com',
    },
    {
      path: '/loading',
      component: Spinner,
      lottie: loading,
      title: 'Give us a moment while we customize a tour for you!',
      onComplete: () => navigate('/schedule-tour'),
    },
    {
      path: '/schedule-tour',
      component: ScheduleTour,
      ...store.user,
      onSubmit: data => navigate('/schedule-tour-confirmation', data),
    },
    {
      path: '/schedule-tour-confirmation',
      component: Confirmation,
      lottie: confirmation,
      title: 'Thank you for scheduling a tour!',
      subtitle: 'Looking forward to meeting you.',
      onStartOver: () => navigate('/'),
      onCall,
      onContactUs: () => navigate('/contact-us'),
      onScheduleTour: () => navigate('/schedule-tour'),
    },
    {
      path: '/contact-us',
      component: ContactUs,
      // FIXME: contactUs.emailTo should be required
      to: contactUs.emailTo || 'lucas@lineups.io',
      from: store.user ? store.user.email : '',
      question: 'Have a question we have an answer?',
      onSubmit: data => navigate('/contact-us-confirmation', data),
    },
    {
      path: '/contact-us-confirmation',
      component: Confirmation,
      lottie: confirmation,
      title: 'Thank you !!! Someone will be in touch soon.',
      onStartOver: () => navigate('/'),
      onCall,
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
