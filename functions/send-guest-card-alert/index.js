const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const client = require('@sendgrid/client')

client.setApiKey(process.env.SENDGRID_API_KEY)

exports.handler = async function(event, context) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const {
    source,
    emailCc,
    user: {
      firstName: first_name,
      lastName: last_name,
      email,
      phone: cell_phone,
    },
    notes,
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
    ['floorplan-amenities']: floorplanAmenities = [],
    ['community-amenities']: communityAmenities = [],
    ['neighborhood-features']: neighborhoodFeatures = [],
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
  const template_id = 'd-cc33424567d249b7b17ca8db966ab547'

  const tour_date = day ? dayjs(day).format('MM/DD/YYYY') : ''
  const tour_start_time = tour_date && time ? dayjs(`${ tour_date } ${ time }`, 'MM/DD/YYYY hh:mma').format('hh:mm a') : ''
  const tour_end_time = tour_date && time ? dayjs(`${ tour_date } ${ time }`, 'MM/DD/YYYY hh:mma').add(30, 'minute').format('hh:mm a') : ''

  const dynamic_template_data = {
    apartment_name,
    first_name,
    last_name,
    email,
    cell_phone,
    desired_move_in: desired_move_in && dayjs(desired_move_in).format('MM/DD/YYYY'),
    desired_bedrooms,
    apartment_tour: tour_date ? 'Apartment Tour' : '',
    tour_date,
    tour_start_time,
    tour_end_time,
    comments: comments.join('\n\n'),
    question,
    floorplan: { options: floorplanAmenities.map(name => ({ name })) },
    community: { options: communityAmenities.map(name => ({ name })) },
  }

  const to = emailCc ? emailCc.split(',').map(email => ({ email })) : undefined
  if (!to) return

  // TODO: make from email an environment variable
  const body = {
    source,
    from: { email: 'hi@lineups.io' },
    personalizations: [{ to, dynamic_template_data }],
    subject: 'You should not see this subject',
    template_id,
    content: [{ type: 'text/html', value: 'You should not see this' }],
  }

  const request = {
    method: 'POST',
    url: '/v3/mail/send',
    body,
  }

  return client.request(request).then(([response]) => response)
}
