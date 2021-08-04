import { useState, useEffect } from 'react'

import { getDates } from './utils'

const LOCAL_STORAGE_KEY = 'utm_lineups'

const useEntrata = (propertyId, timezone) => {
  const [scheduleTimes, setScheduleTimes] = useState([])
  const [duration, setDuration] = useState(30)

  useEffect(() => {
    fetch('/.netlify/functions/entrata-get-appointment-times', {
      method: 'POST',
      body: JSON.stringify({ propertyId }),
    })
      .then(res => res.json())
      .then(json => {
        const appointmentLength = json.result.propertyCalendarSettings.appointmentLength || 30
        setDuration(appointmentLength)

        const { availableHour = [] } = json.result.propertyCalendarAvailability.availableHours
        setScheduleTimes(getDates(availableHour, appointmentLength, timezone))
      })
  }, [propertyId])

  return {
    scheduleTimes,
    onSubmit: form => {
      const item = window.localStorage.getItem(LOCAL_STORAGE_KEY)

      const [first, ...rest] = item ? JSON.parse(item) : []

      return fetch('/.netlify/functions/entrata-update-lead', {
        method: 'POST',
        body: JSON.stringify({
          source: 'Quick View',
          ...form,
          duration,
          propertyId,
          originatingLeadSourceId: first && first.id,
          additionalLeadSourceIds: rest.map(l => l.id).join(','),
        }),
      })
    }
  }
}

export default useEntrata
