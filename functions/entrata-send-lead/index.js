const request = require('request-promise-native')
const btoa = require('btoa')
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(timezone)

const {
  ENTRATA_API_URI: uri,
  ENTRATA_API_USER: user,
  ENTRATA_API_KEY: pass
  SLACK_ALERTS_WEBHOOK
} = process.env


exports.handler = async function(event, context) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const form = JSON.parse(event.body)
  const {
    propertyId,
    originatingLeadSourceId = '64528',
    additionalLeadSourceIds = '',
  } = form
  const today = dayjs().utc().tz('America/Denver').format('MM/DD/YYYYTHH:mm:ss')

  const prospect = {
    leadSource: {
      originatingLeadSourceId,
      additionalLeadSourceIds,
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
    const day = dayjs().format('MM/DD/YYYY')
    const timeTo = dayjs(`${day}T${form.time.value}`, 'MM/DD/YYYYThh:mmA').add(form.duration, 'minute')
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
  }).then(({ response }) => {
    if (response.code !== 200) {
      console.error(`request failed`, JSON.stringify(body), JSON.stringify(response))

      if (SLACK_ALERTS_WEBHOOK) {
        const text = [
          `### Lead Creation Failed`,
          `**Request**`,
          `\`${JSON.stringify(request)}\``,
          "",
          `**Response**`,
          `\`${JSON.stringify(response)}\``,
        ]

        request({
          method: 'POST',
          uri: SLACK_ALERTS_WEBHOOK,
          json: true,
          body: {
            blocks: [
              {
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text: text.join('\n'),
                }
              }
            ]
          },
        })
      }
    }

    return {
      statusCode: response.code,
      body: JSON.stringify(response)
    }
  })
}

