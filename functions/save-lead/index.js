const request = require('request-promise-native')

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

exports.handler = async function(event, context) {
  const {
    firstName,
    lastName,
    email,
    phone,
    apartmentId,
    propertyId,
    crmData,
    vendor,
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
