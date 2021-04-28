const request = require('request-promise-native')
const btoa = require('btoa')
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const {
  ENTRATA_API_URI: uri,
  ENTRATA_API_USER: user,
  ENTRATA_API_KEY: pass
} = process.env


exports.handler = async function(event, context) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const form = JSON.parse(event.body)
  const { propertyId } = form
  const today = dayjs().format('MM/DD/YYYY')

  const prospect = {
    leadSource: {
      // TODO: set lead source
      originatingLeadSourceId: '64529',
      // TODO: set additional lead sources
      //additionalLeadSourceIds: '64529',
    },
    createdDate: today,
    customers: {
      customer: [
        {
          name: {
            firstName: form.firstName,
            lastName: form.lastName
          },
          phone: {
            cellPhoneNumber: form.phone
          },
          email: form.email
        }
      ]
    },
    customerPreferences: {
      desiredMoveInDate: form['move-in'] ? dayjs(form['move-in']).format('MM/DD/YYYY') : '',
      desiredNumBedrooms: form.bedrooms,
      comment: form.notes,
    },
  }

  if (form.day && form.time) {
    const timeTo = dayjs(`${today}T${form.time.value}`, 'MM/DD/YYYYThh:mmA').add(form.duration, 'minute')
    prospect.events = {
      event: [
        {
          type: 'Appointment',
          date: today,
          appointmentDate: dayjs(form.day.value).format('MM/DD/YYYY'),
          timeFrom: form.time.value,
          timeTo: timeTo.format('hh:mmA'),
          eventReasons: 'Tour Community',
          comments: form.notes,
        }
      ]
    }
  } else if (form.question) {
    prospect.events = {
      event: [
        {
          type: 'Note',
          date: today,
          comments: form.question
        }
      ]
    }
  }

  const body = {
    auth: {
      type: 'basic'
    },
    requestId: '_' + Math.random().toString(36).substr(2, 9),
    method: {
      name: 'sendLeads',
      params: {
        propertyId: propertyId,
        doNotSendConfirmationEmail: '1',
        isWaitList: '0',
        prospects: {
          prospect: [prospect]
        }
      }
    }
  }

  return request.post(`${uri}/api/v1/leads`, {
    auth: {
      user: user,
      pass: pass,
    },
    json: true,
    body: body
  }).then(({ response }) => ({
      statusCode: response.code,
      body: JSON.stringify(response)
    }))
}

