const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const client = require('@sendgrid/client')

client.setApiKey(process.env.SENDGRID_API_KEY)

const convertToNumber = desired_bedrooms => {
  if (!desired_bedrooms) return

  return desired_bedrooms === 'Studio' ? 0 : Number.parseInt(desired_bedrooms.replace(/\D/g, ''))
}

exports.handler = async function(event, context) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const {
    emailTo,
    user: {
      firstName: first_name,
      lastName: last_name,
      email,
      phone: cell_phone,
    },
    notes,
    propertyId,
    apartment: {
      name: apartment_name,
    },
    bedrooms,
    ['move-in']: desired_move_in,
    ['schedule-tour']: {
      day,
      time,
    } = {},
    ['contact-us']: {
      question,
    } = {},
    ['floorplan-amenities']: floorplanAmenities,
    ['community-amenities']: communityAmenities,
    ['neighborhood-features']: neighborhoodFeatures,
  } = JSON.parse(event.body)

  const [desired_bedrooms] = bedrooms || []

  const comments = []
  if (desired_bedrooms && desired_move_in)
    comments.push(`${first_name} is looking for a ${desired_bedrooms} around ${dayjs(desired_move_in).format('MM/DD/YYYY')}`)
  if (floorplanAmenities)
    comments.push(`FLOORPLAN AMENITIES: ${ floorplanAmenities.join(', ') }`)
  if (communityAmenities)
    comments.push(`COMMUNITY AMENITIES: ${ communityAmenities.join(', ') }`)
  if (neighborhoodFeatures)
    comments.push(`NEIGHBORHOOD ACTIVITIES: ${ neighborhoodFeatures.join(', ') }`)
  if (notes) comments.splice(0, 0, `${ notes }\n--------------`)

  // TODO: make template_id an environment variable ???
  let template_id = 'd-282d96e3c6d0414e903c076d43091304'

  const tour_date = day ? dayjs(day).format('MM/DD/YYYY') : ''
  const tour_start_time = tour_date && time ? dayjs(`${ tour_date } ${ time }`, 'MM/DD/YYYY hh:mma').format('hh:mm a') : ''
  const tour_end_time = tour_date && time ? dayjs(`${ tour_date } ${ time }`, 'MM/DD/YYYY hh:mma').add(30, 'minute').format('hh:mm a') : ''

  const dynamic_template_data = {
    property_id: propertyId,
    apartment_name,
    first_name,
    last_name,
    email,
    cell_phone,
    desired_move_in: desired_move_in && dayjs(desired_move_in).format('MM/DD/YYYY'),
    desired_bedrooms: convertToNumber(desired_bedrooms),
    apartment_tour: tour_date ? 'Apartment Tour' : '',
    tour_date,
    tour_start_time,
    tour_end_time,
    comments: comments.join('\n\n'),
    question,
  }

  const to = emailTo.split(/ *, */).map(email => ({ email }))

  // TODO: make from email an environment variable
  const body = {
    from: { email: 'hi@lineups.io' },
    personalizations: [{ to, dynamic_template_data }],
    subject: 'You should not see this subject',
    template_id,
    content: [{ type: 'text/plain', value: 'You should not see this' }],
  }

  const request = {
    method: 'POST',
    url: '/v3/mail/send',
    body,
  }

  return client.request(request).then(response => {
    const [{ statusCode, body }] = response
    return {
      statusCode,
      body: JSON.stringify(statusCode === 202 ? { message: 'Email sent' } : body),
    }
  })
}