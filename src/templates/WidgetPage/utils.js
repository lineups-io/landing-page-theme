import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DEFAULT_TIMEZONE = '-0700'

const setTime = (date, time, tz = DEFAULT_TIMEZONE) => {
  const str = tz.replace(/[^-0-9]/g, '') || '0'
  const offset = Number.parseInt(str) / 100
  return dayjs(`${date} ${time.replace(/MST$/, DEFAULT_TIMEZONE)}`, 'MM/DD/YYYY HH:mm:ssZZ').utcOffset(offset)
}

export const getDates = (businessHours = [], duration = 30, tz) => {
  return businessHours
    .map(hr => {
      const date = dayjs(hr.date, 'MM/DD/YYYY')
      const times = []

      const close = setTime(hr.date, hr.endTime, tz)
      let next = setTime(hr.date, hr.startTime, tz)

      while (next.valueOf() < close.valueOf()) {
        const value = next.format('hh:mma')
        times.push({ value, label: value })
        next = next.add(duration, 'minute')
      }

      return {
        value: date.toDate(),
        label: date.format('MMM DD - dddd'),
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
