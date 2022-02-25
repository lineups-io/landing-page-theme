const request = require('request-promise-native')
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const {
  GRAPHQL_API_URI = 'http://localhost:4000/dev/api/graphql',
  GRAPHQL_API_KEY = '',
} = process.env

const query = `
  fragment LeadFields on Lead {
    _id
    firstName
    lastName
    email
    phone

    vendor

    propertyId
    # property

    leadId
    # lead

    # activity

    apartmentId
    # apartment
    createdAt
    updatedAt
  }

  mutation saveLead ($doc: LeadInput) {
    insertLead(doc: $doc) {
      ...LeadFields
    }
  }
`

const convertToNumber = desired_bedrooms => {
  if (!desired_bedrooms) return

  return desired_bedrooms === 'Studio' ? 0 : Number.parseInt(desired_bedrooms.replace(/\D/g, ''))
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
  } = JSON.parse(event.body)

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

      preferences: {
        bedrooms: convertToNumber(bedrooms),
        moveInDate: dayjs(moveInDate, 'MM/DD/YYYY').toISOString(),
        floorplanAmenities,
        communityAmenities,
        nearby,
      },
    },
  }

  return request.post(GRAPHQL_API_URI, {
    headers: {
      Authorization: `Bearer ${GRAPHQL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    })
  }).then(body => {
    return {
      statusCode: 200,
      body,
    }
  })
}
