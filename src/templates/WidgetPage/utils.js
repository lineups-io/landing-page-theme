import addDate from 'date-fns/add'
import formatDate from 'date-fns/format'

const setTime = (date, time) => {
  const [, hour, minute, ampm] = time.match(/(\d+):(\d+) (am|pm)/i)
  const d = new Date(date)
  d.setHours((Number.parseInt(hour) + (ampm.match(/pm/i) ? 12 : 0)) % 24)
  d.setMinutes(Number.parseInt(minute) % 60)
  d.setSeconds(0)
  d.setMilliseconds(0)

  return d
}

export const getDates = (businessHours = [], duration = 30) => {
  const today = new Date()
  return new Array(15)
    .fill(null)
    .map((n, idx) => addDate(today, { days: idx }))
    .map(date => {
      const times = []

      const day = businessHours.find(hr => hr.day === formatDate(date, 'EEEE'))
      if (day) {
        const close = setTime(date, day.closeTime)
        let next = setTime(date, day.openTime)

        while (next.valueOf() < close.valueOf()) {
          const value = formatDate(next, 'h:mm a')
          times.push({ value, label: value })
          next = addDate(next, { minutes: duration })
        }
      }

      return {
        value: date,
        label: formatDate(date, 'MMM dd - EEEE'),
        times,
      }
    })
    .filter(date => date.times.length > 0)
}
