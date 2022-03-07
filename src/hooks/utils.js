import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import shajs from 'sha.js'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

const getTimezone = str => {
  let tz = ''
  if (!str) tz = dayjs.tz.guess()
  else if (str.match(/eastern/i)) tz = 'America/New_York'
  else if (str.match(/central/i)) tz = 'America/Chicago'
  else if (str.match(/mountain/i)) tz = 'America/Denver'
  else if (str.match(/pacific/i)) tz = 'America/Los_Angeles'
  else if (str.match(/alaska/i)) tz = 'America/Anchorage'
  else console.warn(`Timezone ${str} not supported`)

  return tz
}

const MST_OFFSET = '-0700'

const setTime = (date, time) => {
  if (time.match(/MST$/))
    return dayjs(`${date} ${time.replace(/MST$/, MST_OFFSET)}`, 'MM/DD/YYYY HH:mm:ssZZ')
  else
    return dayjs(`${date} ${time.toLowerCase()}`, 'MM/DD/YYYY h:mm a')
}

export const getDates = (businessHours = [], duration = 30, tz) => {
  const localTimezone = getTimezone(tz)
  return businessHours
    .map(hr => {
      const date = dayjs(hr.date, 'MM/DD/YYYY')
      const times = []

      const close = setTime(hr.date, hr.endTime).tz(localTimezone)
      let next = setTime(hr.date, hr.startTime).tz(localTimezone)
      let end = dayjs(next).add(duration, 'minute')
      const now = dayjs.tz(Date.now(), localTimezone)

      while (end.valueOf() <= close.valueOf()) {
        if (next.valueOf() >= now) {
          const offset = Number.parseInt(MST_OFFSET) / 100
          const value = next.utc().utcOffset(offset).format('hh:mma')
          const label = next.format('hh:mma')
          times.push({ value, label })
        }
        next = next.add(duration, 'minute')
        end = dayjs(next).add(duration, 'minute')
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

// Generate unique IDs for use as pseudo-private/protected names.
// Similar in concept to
// <http://wiki.ecmascript.org/doku.php?id=strawman:names>.
//
// The goals of this function are twofold:
//
// * Provide a way to generate a string guaranteed to be unique when compared
//   to other strings generated by this function.
// * Make the string complex enough that it is highly unlikely to be
//   accidentally duplicated by hand (this is key if you're using `ID`
//   as a private/protected name on an object).
//
// Use:
//
//     const privateName = ID()
//     const o = { 'public': 'foo' }
//     o[privateName] = 'bar'
export const ID = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9)
}

export const hash = (val, alg = 'sha256', dig = 'hex') => {
  return val && shajs(alg).update(val).digest(dig)
}
