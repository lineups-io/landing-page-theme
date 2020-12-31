import React from 'react'
import { Route } from 'react-router-dom'
import dayjs from 'dayjs'
import { camelCase } from 'lodash'

import VideoPlayer from 'gatsby-theme-atomic-design/src/templates/VideoPlayer'
import MultipleChoiceQuestion from 'gatsby-theme-atomic-design/src/templates/MultipleChoiceQuestion'
import GuestCard from 'gatsby-theme-atomic-design/src/templates/GuestCard'
import Spinner from 'gatsby-theme-atomic-design/src/templates/Spinner'
import ScheduleTour from 'gatsby-theme-atomic-design/src/templates/ScheduleTour'
import ContactUs from 'gatsby-theme-atomic-design/src/templates/ContactUs'
import Confirmation from 'gatsby-theme-atomic-design/src/templates/Confirmation'
import Story from 'gatsby-theme-atomic-design/src/templates/VideoWidget'
import InfiniteCalendar from 'gatsby-theme-atomic-design/src/templates/InfiniteCalendar'
import CheckAvailability from 'gatsby-theme-atomic-design/src/templates/CheckAvailability'

import useLocalStorage from './useLocalStorage.js'
import useNavigate from './useNavigate.js'
import NavLeft from './NavLeft'
import NavRight from './NavRight'

import loading from './loading.json'
import confirmation from './confirmation.json'

import ID from './id.js'

const formatPhone = str => `tel:+1${ str.replace(/\D/g, '') }`

const callFunction = data =>
  fetch('/.netlify/functions/realpage-ilm-update-lead', {
    method: 'POST',
    body: JSON.stringify(data),
  })

const Routes = ({
  info,
  intro,
  bedrooms,
  floorplanAmenities,
  communityAmenities,
  story,
  neighborhoodFeatures,
  ...props
}) => {
  const [store, setStore] = useLocalStorage('store', { user: {} })
  const updateStore = (location, data = {}) => {
    const key = location.pathname.replace(/^\//, '') || 'index'
    const user = {
      id: store.user.id || ID(),
      firstName: data.firstName || store.user.firstName,
      lastName: data.lastName || store.user.lastName,
      email: data.email || store.user.email,
      phone: data.phone || store.user.phone,
    }

    if (key.match(/^(guest-card|schedule-tour|contact-us)$/)) {
      const { emailTo, emailCc } = props[camelCase(key)]

      let notes

      if (key === 'schedule-tour') {
        const { day, time } = data
        notes = `TOUR REQUESTED FOR ${dayjs(day).format('ddd - MMM D, YYYY')} at ${time}`
      } else if (key === 'contact-us') {
        const { question } = data
        notes = `${ user.firstName } asked this question: ${ question }`
      }

      callFunction({
        ...store,
        user,
        emailTo,
        emailCc,
        notes,
        apartment: {
          _id: info.apartment._id,
          name: info.apartment.name,
        },
        [key]: data,
      })

      setStore({
        ...store,
        user,
        [key]: undefined,
      })
    } else {
      setStore({
        ...store,
        user,
        [key]: data,
      })
    }
  }

  const navigate = useNavigate(updateStore)

  const transform = (path, { options, ...obj }, next) => obj.status !== 'hidden' ? ({
    path,
    component: MultipleChoiceQuestion,
    ...obj,
    NavLeft: () => <NavLeft onClick={() => navigate(-1)} />,
    NavRight: () => obj.status === 'optional' && next ? <NavRight onClick={() => navigate(next)} /> : null,
    options: options.filter(option => option.active),
    onSubmit: data => navigate(next, options.filter(option => data.indexOf(option.value) > -1).map(option => option.label)),
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
    },
    transform('/bedrooms', bedrooms, '/move-in'),
    {
      path: '/move-in',
      component: InfiniteCalendar,
      NavLeft: () => <NavLeft onClick={() => navigate(-1)} />,
      onSubmit: date => navigate('/floorplan-amenities', date),
      lastDate: store['move-in'] && dayjs(store['move-in']).toDate(),
    },
    transform('/floorplan-amenities', floorplanAmenities, '/community-amenities'),
    transform('/community-amenities', communityAmenities, '/neighborhood-features'),
    transform('/neighborhood-features', neighborhoodFeatures, '/loading'),
    {
      path: '/loading',
      component: Spinner,
      lottie: loading,
      title: 'Give us a moment while we customize a tour for you!',
      onComplete: () => navigate('/guest-card'),
    },
    {
      path: '/guest-card',
      component: GuestCard,
      ...store.user,
      title: 'To help us personalize the experience, tell us a little about you',
      onSubmit: data => navigate('/story', data),
      privacyPolicyUrl: info.privacyPolicyUrl,
    },
    {
      path: '/story',
      component: Story,

      theme: info.account.theme,
      data: story.data,

      onCheckAvailibility: () => navigate('/check-availability'),
      onCall,
      onContactUs: () => navigate('/contact-us'),
      onScheduleTour: () => navigate('/schedule-tour'),
    },
    {
      path: '/check-availability',
      component: CheckAvailability,
      floorplans: info.apartment.floorplans.map(fp => ({
        ...fp,
        floorplanAvailabilityUrl: fp.floorplanAvailabilityUrl || info.apartment.floorPlanUrl,
      })),
      NavLeft: () => <NavLeft onClick={() => navigate(-1)} />,
    },
    {
      path: '/schedule-tour',
      component: ScheduleTour,
      ...store.user,
      onSubmit: data => navigate('/schedule-tour-confirmation', data),
      NavLeft: () => <NavLeft onClick={() => navigate(-1)} />,
      privacyPolicyUrl: info.privacyPolicyUrl,
    },
    {
      path: '/schedule-tour-confirmation',
      component: Confirmation,
      lottie: confirmation,
      title: 'Thank you for scheduling your preferred tour time with us.',
      subtitle: 'A Rockstar team member will be in touch to confirm your visit.',
      onStartOver: () => navigate('/'),
      onCall,
      onContactUs: () => navigate('/contact-us'),
      onScheduleTour: () => navigate('/schedule-tour'),
    },
    {
      path: '/contact-us',
      component: ContactUs,
      // FIXME: contactUs.emailTo should be required
      to: props.contactUs.emailTo || 'hi@lineups.io',
      from: store.user ? store.user.email : '',
      question: 'Have a question we have an answer?',
      privacyPolicyUrl: info.privacyPolicyUrl,
      onSubmit: data => navigate('/contact-us-confirmation', data),
      NavLeft: () => <NavLeft onClick={() => navigate(-1)} />,
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