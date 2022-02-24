import { useState, useEffect } from 'react'
import dayjs from 'dayjs'

import { getDates } from './utils'

const LOCAL_STORAGE_KEY = 'utm_lineups'
const DEFAULT_DURATION = 30

const useLeadManager = ({
  source,
  account,
  apartment,
  guestCard,
  contactUs,
  scheduleTour,
}) => {
  const [scheduleTimes, setScheduleTimes] = useState([])
  const [duration, setDuration] = useState(DEFAULT_DURATION)

  const propertyId = apartment.externalDataSource.id
  const {
    timezone,
    officeHours = [],
  } = apartment.externalData
  const hours = officeHours.length > 0 ? officeHours : apartment.businessHours

  useEffect(() => {
    if (scheduleTour.vendor.match(/entrata/i)) {
      fetch('/.netlify/functions/entrata-get-appointment-times', {
        method: 'POST',
        body: JSON.stringify({
          propertyId: scheduleTour.vendorPropertyId || propertyId
        }),
      })
        .then(res => res.json())
        .then(json => {
          const appointmentLength = json.result.propertyCalendarSettings.appointmentLength || DEFAULT_DURATION
          setDuration(appointmentLength)

          const { availableHour = [] } = json.result.propertyCalendarAvailability.availableHours
          setScheduleTimes(getDates(availableHour, appointmentLength, timezone))
        })
    } else if (hours) {
      const dates = []

      for(let i = 0; i < 14; i++) {
        const date = dayjs().add(i, 'day')
        const day = hours.find(d => d.day === date.format('dddd'))
        if (day) {
          dates.push({
            date: date.format('MM/DD/YYYY'),
            startTime: day.openTime,
            endTime: day.closeTime,
          })
        }
      }

      setScheduleTimes(getDates(dates, duration))
    }
  }, [])

  const updateLead = request => {
    const {
      vendor,
      vendorPropertyId,
    } = request

    const item = window.localStorage.getItem(LOCAL_STORAGE_KEY)

    const [first, ...rest] = item ? JSON.parse(item) : []

    return fetch(`/.netlify/functions/${vendor.toLowerCase()}-update-lead`, {
      method: 'POST',
      body: JSON.stringify({
        ...request,
        duration,
        account,
        propertyName: apartment && apartment.name,
        propertyId: vendorPropertyId || propertyId,
        originatingLeadSourceId: first && first.id,
        additionalLeadSourceIds: rest.map(l => l.id).join(','),
      }),
    }).then(res => {
      return res.json()
    }).then(crmData => {
      return fetch(`/.netlify/functions/save-lead`, {
        method: 'POST',
        body: JSON.stringify({
          ...request,
          apartmentId: apartment && apartment._id,
          propertyId: vendorPropertyId || propertyId,
          vendor: vendor.toLowerCase(),
          crmData,
        }),
      }).then(() => crmData)
    })
  }

  const submitGuestCard = data => {
    const request = {
      apartment,
      ...data,
      ...guestCard,
    }
    console.debug('submitGuestCard', request)
    return updateLead(request).then(res =>
      fetch('/.netlify/functions/send-guest-card-alert', {
        method: 'POST',
        body: JSON.stringify(request),
      }).then(() => res)
    ).then(response => ({ request, response }))
  }

  const submitContactUs = data => {
    const request = {
      apartment,
      ...data,
      ...contactUs,
    }
    console.debug('submitContactUs', request)
    return updateLead(request).then(res =>
      fetch('/.netlify/functions/send-contact-us-alert', {
        method: 'POST',
        body: JSON.stringify(request),
      }).then(() => res)
    ).then(response => ({ request, response }))
  }

  const submitScheduleTour = data => {
    const request = {
      apartment,
      ...data,
      ...scheduleTour,
      duration,
    }
    console.debug('submitScheduleTour', request)
    return updateLead(request).then(res =>
      fetch('/.netlify/functions/send-schedule-tour-alert', {
        method: 'POST',
        body: JSON.stringify(request),
      }).then(() => res)
    ).then(response => ({ request, response }))
  }

  return {
    scheduleTimes,
    submitGuestCard,
    submitContactUs,
    submitScheduleTour,
  }
}

export default useLeadManager
