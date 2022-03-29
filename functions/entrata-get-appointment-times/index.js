const request = require('request-promise-native')
const btoa = require('btoa')
const dayjs = require('dayjs')
const merge = require('deepmerge')
const customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.extend(customParseFormat)

const {
  ENTRATA_API_URI: uri,
  ENTRATA_API_USER: user,
  ENTRATA_API_KEY: pass
} = process.env

const getCalendarAvailability = (propertyId, date) => {
  const body = {
    auth: {
      type: 'basic'
    },
    requestId: '_' + Math.random().toString(36).substr(2, 9),
    method: {
      name: 'getCalendarAvailability',
      params: {
        propertyId: propertyId,
        fromDate: dayjs(date).format('MM/DD/YYYY'),
        toDate: dayjs(date).add(7, 'days').format('MM/DD/YYYY'),
        calendarEventCategoryIds: [
          '1', // General
          '2', // Resident
          '3', // Leasing
        ].join(',')
      }
    }
  }

  return request.post(`${uri}/api/v1/properties`, {
    auth: {
      user: user,
      pass: pass,
    },
    json: true,
    body: body
  })
}

exports.handler = async function(event, context) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const data = JSON.parse(event.body)
  const { propertyId } = data

  return Promise.all([
    getCalendarAvailability(propertyId, dayjs()),
    getCalendarAvailability(propertyId, dayjs().add(8, 'days')),
  ]).then(values => {
    return merge.all(values)
  }).then(({ response }) => {
    if (response.error) {
      return {
        statusCode: response.error.code,
        body: response.error.message,
      }
    } else {
      return {
        statusCode: response.code,
        body: JSON.stringify(response)
      }
    }
  })
}
