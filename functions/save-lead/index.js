const request = require('request-promise-native')
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const {
  GRAPHQL_API_URI = 'http://localhost:4000/dev/api/graphql',
  GRAPHQL_API_KEY = '',
} = process.env

const convertToNumber = desired_bedrooms => {
  if (!desired_bedrooms) return

  return desired_bedrooms === 'Studio' ? 0 : Number.parseInt(desired_bedrooms.replace(/\D/g, ''))
}

const getDate = str => {
  if (!str)
    return
  else if (dayjs(str).isValid())
    return dayjs(str).toISOString()
  else if (dayjs(str, 'MM/DD/YYYY').isValid())
    return dayjs(str, 'MM/DD/YYYY').toISOString()
  else
    return str
}

exports.handler = async function(event, context) {
  const {
    user: {
      firstName,
      lastName,
      email,
      phone,
    },
    apartmentId,
    propertyId,
    crmData,
    vendor,
    bedrooms,
    ['move-in']: moveInDate,
    ['floorplan-amenities']: floorplanAmenities,
    ['community-amenities']: communityAmenities,
    ['neighborhood-features']: nearby,
    question,
    notes,
    ...form
  } = JSON.parse(event.body)

  let requestedTourDate

  if (form.day && form.time) {
    const day = dayjs(form.day.value).format('MM/DD/YYYY')
    requestedTourDate = dayjs(`${day} ${form.time.label}`, 'MM/DD/YYYY hh:mma').toISOString()
  }

  const variables = {
    doc: {
      firstName,
      lastName,
      email,
      phone,
      apartmentId,
      propertyId,

      // leadId: ID
      crmData,

      apiSettings: {
        vendor,
        /*
        uri: String
        username: String
        password: String
        id: ID
        */
      },

      requestedTourDate,
      question,
      notes,

      preferences: {
        bedrooms: convertToNumber(bedrooms),
        moveInDate: getDate(moveInDate),
        floorplanAmenities,
        communityAmenities,
        nearby,
      },
    },
  }

  return request.post(GRAPHQL_API_URI.replace(/graphql$/, 'save-lead'), {
    headers: {
      Authorization: `Bearer ${GRAPHQL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    json: true,
    body: variables.doc,
  }).then(body => {
    return {
      statusCode: 200,
      body: JSON.stringify(body),
    }
  })
}
