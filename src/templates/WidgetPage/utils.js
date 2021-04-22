import addDate from 'date-fns/add'
import formatDate from 'date-fns/format'
import parseDate from 'date-fns/parse'

const setTime = (date, time) => {
  const [, hour, minute] = time.match(/(\d+):(\d+)/i)
  const d = new Date(date)
  d.setHours(Number.parseInt(hour) % 24)
  d.setMinutes(Number.parseInt(minute) % 60)
  d.setSeconds(0)
  d.setMilliseconds(0)

  return d
}

const parseTime = str => str.match(/([0-9]{2}:[0-9]{2}:[0-9]{2})([A-Z]{3})/i)

export const getDates = (businessHours = [], duration = 30) => {
  return businessHours
    .map(hr => {
      const date = parseDate(hr.date, 'MM/dd/yyyy', new Date())
      const times = []

      const [, openTime] = parseTime(hr.startTime)
      const [, closeTime] = parseTime(hr.endTime)
      const day = { openTime, closeTime }

      if (day) {
        const close = setTime(date, day.closeTime)
        let next = setTime(date, day.openTime)

        while (next.valueOf() < close.valueOf()) {
          const value = formatDate(next, 'hh:mma')
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
    .reduce((acc, next) => {
      const found = acc.find(a => a.value.valueOf() === next.value.valueOf())

      if (found && next.times.length > 0) {
        found.times = [...found.times, ...next.times]
      } else if (next.times.length > 0) {
        return [...acc, next]
      }

      return acc
    }, [])
}
