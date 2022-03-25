import React, { useEffect } from 'react'
import { Route, useLocation } from 'react-router-dom'
import dayjs from 'dayjs'
import { startCase } from 'lodash'
import { useTracking } from 'react-tracking'

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

import useLocalStorage from '../../hooks/useLocalStorage.js'
import useNavigate from '../../hooks/useNavigate.js'
import NavLeft from './NavLeft'
import NavRight from './NavRight'

import loading from './loading.json'
import confirmation from './confirmation.json'

import { ID, hash } from '../../hooks/utils'

import useLeadManager from '../../hooks/useLeadManager'

const formatPhone = str => `tel:+1${ str.replace(/\D/g, '') }`

const getBedroomsFilter = (data = []) => {
  const [bedrooms] = data

  if (!bedrooms) return
  else return bedrooms === 'Studio' ? 0 : Number.parseInt(bedrooms)
}

const Routes = ({
  info,
  intro,
  bedrooms,
  schoolTerms,
  floorplanAmenities,
  communityAmenities,
  story,
  ...props
}) => {
  const location = useLocation()
  const { trackEvent } = useTracking()
  const [store, setStore] = useLocalStorage('store', { user: {} })

  const {
    scheduleTimes: dates = [],
    submitGuestCard,
    submitContactUs,
    submitScheduleTour,
  } = useLeadManager({
    source: 'Apartment Stories',
    account: info.account.name,
    apartment: info.apartment,
    ...props,
  })

  const updateStore = (data = {}, prev) => {
    const key = prev.pathname.replace(/^\//, '') || 'index'
    const email = data.email || store.user.email
    const emailHash = hash(email)
    const user = {
      id: store.user.id || ID(),
      firstName: data.firstName || store.user.firstName,
      lastName: data.lastName || store.user.lastName,
      email,
      phone: data.phone || store.user.phone,
      emailHash,
    }

    if (key.match(/^(guest-card|schedule-tour|contact-us)$/)) {

      const request = {
        ...store,
        user,
        [key]: data,
      }

      const [bedrooms] = request.bedrooms || []
      if (bedrooms) {
        request.bedrooms = bedrooms === 'Studio' ? '0' : bedrooms.replace(/[^0-9]/g, '')
      }

      let daysToMoveIn
      request['move-in'] = Array.isArray(request['move-in']) ? request['move-in'][0] : request['move-in']

      if (request['move-in']) {
        const today = dayjs()
        daysToMoveIn = dayjs(request['move-in']).diff(today, 'day')
      }

      trackEvent({
        event: 'custom.form.submit',
        action: 'submit',
        moveInDate: request['move-in'],
        daysToMoveIn,
        hashedEmail: emailHash,
        hashedPhone: hash(user.phone),
        userId: user.id,
      })

      if (key === 'schedule-tour') {
        const { day, time } = data
        request.notes = `TOUR REQUESTED FOR ${dayjs(day).format('ddd - MMM D, YYYY')} at ${time.label}`
        request.day = { value: day }
        request.time = time
        submitScheduleTour(request)
          .then(({ response }) => {
            trackEvent({
              event: 'custom.form.complete',
              action: 'complete',
              crmId: response.code === 200
                ? response.result.prospects.prospect[0].applicationId
                : undefined,
            })
          })
      } else if (key === 'contact-us') {
        const { question } = data
        request.question = `${ user.firstName } asked this question: ${ question }`
        submitContactUs(request)
          .then(({ response }) => {
            trackEvent({
              event: 'custom.form.complete',
              action: 'complete',
              crmId: response.code === 200
                ? response.result.prospects.prospect[0].applicationId
                : undefined,
            })
          })
      } else if (key === 'guest-card') {
        request.notes = [
          'Beds: ' + (request.bedrooms || 'No preference selected'),
          'Move In: ' + (request['move-in'] ? dayjs(request['move-in']).format('ddd - MMM D, YYYY') : 'No date selected'),
        ].join(', ')
        submitGuestCard(request)
          .then(({ response }) => {
            trackEvent({
              event: 'custom.form.complete',
              action: 'complete',
              crmId: response.code === 200
                ? response.result.prospects.prospect[0].applicationId
                : undefined,
            })
          })
      }

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

  useEffect(() => {
    const title = location.pathname.replace(/^\//, '') || 'home'
    const { user } = store
    trackEvent({
      event: 'page_view',
      page_location: window.location.href,
      page_title: `${ info.apartment.name } - ${ startCase(title) }`,
      account: info.account.name,
      apartment: info.apartment.name,
      user_id: user && user.id,
      user_email_hash: user && user.emailHash,
    })
  }, [location])

  const navigate = useNavigate(updateStore)

  const totalSteps = 4
  const transform = (path, obj, next, key = 'label', stepNo) => {
    const options = obj.options ? obj.options.filter(option => option.active) : []
    const mapToItem = option => ({
      item_name: option.label,
      item_category: path.replace(/^\//, ''),
      item_brand: info.apartment.name,
      affiliation: info.account.name,
  })
    return obj.status !== 'hidden' ? ({
      path,
      component: MultipleChoiceQuestion,
      ...obj,
      NavLeft: () => <NavLeft onClick={() => navigate(-1)} />,
      NavRight: () => obj.status === 'optional' && next ? <NavRight onClick={() => navigate(next)} /> : null,
      options,
      onMount: () => {
        const items = options.map(mapToItem)
        // added 1ms timeout to fire page_view first
        setTimeout(() => {
          trackEvent({ ecommerce: { items: undefined } })
          trackEvent({ event: 'view_item', ecommerce: { items } })
          trackEvent({ amenities: { options: undefined } })
          trackEvent({
            event: 'custom.amenities.shown',
            stepNo,
            totalSteps,
            amenities: {
              name: obj.question,
              options: options.map(option => option[key]),
            },
          })
        }, 1)
      },
      onSubmit: data => {
        const selected = options.filter(option => data.indexOf(option.value) > -1)
        const items = selected.map(mapToItem)
        trackEvent({ ecommerce: { items: undefined } })
        trackEvent({ event: 'add_to_wishlist', ecommerce: { items } })
        trackEvent({ amenities: { options: undefined } })
        trackEvent({
          event: 'custom.amenities.selected',
          stepNo,
          totalSteps,
          amenities: {
            name: obj.question,
            options: selected.map(option => option[key])
          },
        })
        navigate(next, selected.map(option => option[key]))
      },
    }) : undefined
  }

  const onCall = () => window.open(formatPhone(info.apartment.prospectPhoneNumber))

  const selectTerm = schoolTerms && schoolTerms.options && transform('/move-in', schoolTerms, '/loading', 'value', 4)

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
      onBeginTour: () => {
        trackEvent({
          event: 'custom.click.cta',
          action: 'Begin Tour',
        })
        navigate('/bedrooms')
      },
      onScheduleTour: () => {
        trackEvent({
          event: 'custom.click.cta',
          action: 'Schedule Tour',
        })
        navigate('/schedule-tour')
      },
    },
    transform('/bedrooms', bedrooms, '/floorplan-amenities', 'label', 1),
    transform('/floorplan-amenities', floorplanAmenities, '/community-amenities', 'label', 2),
    transform('/community-amenities', communityAmenities, '/move-in', 'label', 3),
    selectTerm || {
      path: '/move-in',
      component: InfiniteCalendar,
      NavLeft: () => <NavLeft onClick={() => navigate(-1)} />,
      onSubmit: date => navigate('/loading', date),
      lastDate: store['move-in'] && dayjs(store['move-in']).toDate(),
    },
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
        floorplanAvailabilityUrl: undefined,
      })),
      selectedBedroomsFilter: getBedroomsFilter(store.bedrooms),
      NavLeft: () => <NavLeft onClick={() => navigate(-1)} />,
      onCall,
      onContactUs: () => navigate('/contact-us'),
      onScheduleTour: () => navigate('/schedule-tour'),
      onCheckAvailibility: () => navigate('/check-availability'),
    },
    {
      path: '/schedule-tour',
      component: ScheduleTour,
      ...store.user,
      dates,
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
      onCheckAvailibility: () => navigate('/check-availability'),
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
      onCheckAvailibility: () => navigate('/check-availability'),
    },
  ]

  return routes.map(({ component: Component, path, ...props }, i) =>
    <Route key={i} exact path={path}>
      <Component {...props} />
    </Route>
  )
}

export default Routes
