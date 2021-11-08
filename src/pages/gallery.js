import React from 'react'
import { Helmet } from 'react-helmet'

import Gallery from 'gatsby-theme-lineups/src/templates/Gallery'

const data = {
  lineups: {
    gallery: {
      sections: [
        {
          title: 'Welcome Home',
          description: 'Discover a Community Redefined®. *Receive SIX WEEKS FREE all floor plans! Limited time only.',
          thumbnail: 'https://cdn.filestackcontent.com/oKZkcaB4QrK9jgWyFPVW',
          media: [
            {
              type: 'video/mp4',
              url: 'https://res.cloudinary.com/lineups-io/video/upload/c_scale,w_500/v1629959750/video/Trinity%20-%20LEX/lex-square.mp4',
              pos: [ 0, 0 ],
              dim: [ 5, 5 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://cdn.filestackcontent.com/oKZkcaB4QrK9jgWyFPVW',
              pos: [ 5, 0 ],
              dim: [ 5, 5 ]
            },
          ]
        },
        {
          title: 'Community Amenities',
          description: [
            'Executive Business Center with iMac Computers',
            'Fitness Center with Cardio and Strength Training Equipment',
            'Bark Park',
            'Covered Parking',
            'Game Room & Billiards',
          ].join(' - '),
          thumbnail: 'https://cdn.filestackcontent.com/dRMJU8UCSMe9ZmIdcHzf',
          media: [
            {
              type: 'image/jpeg',
              src: 'https://cdn.filestackcontent.com/dRMJU8UCSMe9ZmIdcHzf',
              pos: [ 0, 0 ],
              dim: [ 6, 4 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://cdn.filestackcontent.com/izovD37JQTiYBZfGUODF',
              pos: [ 0, 4 ],
              dim: [ 3, 2 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://cdn.filestackcontent.com/pTRXKL0RsWd6u52YRLfA',
              pos: [ 3, 4 ],
              dim: [ 3, 2 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://cdn.filestackcontent.com/U42haSE1RAakWvZuqHAC',
              pos: [ 0, 6 ],
              dim: [ 6, 4 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://cdn.filestackcontent.com/RSt0wB8HRpK0XHiTHpbP',
              pos: [ 0, 10 ],
              dim: [ 3, 2 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://cdn.filestackcontent.com/nJDVd2Y5T9BbdtQ2wUcv',
              pos: [ 3, 10 ],
              dim: [ 3, 2 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://cdn.filestackcontent.com/CKwRtJnsR1OtGSgkCq9v',
              pos: [ 0, 12 ],
              dim: [ 6, 4 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://cdn.filestackcontent.com/k5fOLJNSIinVdy90ypBE',
              pos: [ 0, 16 ],
              dim: [ 3, 2 ]
            },
            {
              type: 'embed/matterport',
              modelId: 'tu2FPiThQKP&play=1',
              pos: [ 0, 20 ],
              dim: [ 6, 4 ]
            },
          ]
        },
        {
          title: 'Fun In The Sun',
          description: [
            'Executive Business Center with Computers',
            'Fitness Center with Cardio and Strength Training Equipment',
            'Bark Park with Interactive Obstacle Courses',
            'Grand Lobby with HDTV\'s & Premium Audio System',
            'Reserved Parking',
            'Game Room & Billiards',
          ].join(' - '),
          thumbnail: 'https://cdn.filestackcontent.com/dRMJU8UCSMe9ZmIdcHzf',
          media: [
            {
              type: 'image/jpeg',
              src: 'https://cdn.filestackcontent.com/dRMJU8UCSMe9ZmIdcHzf',
              pos: [ 0, 0 ],
              dim: [ 6, 4 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://cdn.filestackcontent.com/izovD37JQTiYBZfGUODF',
              pos: [ 0, 4 ],
              dim: [ 6, 4 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://cdn.filestackcontent.com/YXO779pcQ7Cq6018iBGs',
              pos: [ 0, 8 ],
              dim: [ 3, 2 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://cdn.filestackcontent.com/MK07Hi7rSNOleOMOOQWE',
              pos: [ 3, 8 ],
              dim: [ 3, 2 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://cdn.filestackcontent.com/k5fOLJNSIinVdy90ypBE',
              pos: [ 0, 10 ],
              dim: [ 6, 4 ]
            }
          ]
        },
        {
          title: 'Home',
          description: [
            'Our luxury apartments are available in a large selection of floor plans that have been equipped with the best features and amenities to enhance your living experience. Ranging from 598 to 1,552 square feet, you’ll have no problem finding the perfect size home for your needs. '
          ].join(' - '),
          thumbnail: 'https://cdn.filestackcontent.com/a0iNF2CzQyCM1B9huIBa',
          media: [
            {
              type: 'image/jpeg',
              src: 'https://cdn.filestackcontent.com/a0iNF2CzQyCM1B9huIBa',
              pos: [ 0, 0 ],
              dim: [ 6, 4 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://cdn.filestackcontent.com/5p0MnMtBTLavEjiMsdtW',
              pos: [ 0, 4 ],
              dim: [ 6, 4 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://cdn.filestackcontent.com/1XQ6wgTDRMWM4dhAx1IP',
              pos: [ 0, 8 ],
              dim: [ 3, 2 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://cdn.filestackcontent.com/GZbjPALFTUfvKH12IDSc',
              pos: [ 3, 8 ],
              dim: [ 3, 2 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://cdn.filestackcontent.com/gLuOfbUQOu3U7uMbyZSj',
              pos: [ 0, 10 ],
              dim: [ 6, 4 ]
            },
            {
              type: 'embed/matterport',
              modelId: '8WixZmowAb9',
              pos: [ 0, 14 ],
              dim: [ 6, 4 ]
            }
          ]
        },
        {
          title: 'Neighborhood',
          description: [
            'Freds Pizza',
            'Julies Coffee',
            'Mike Lemonaide',
            'Bark Park',
            '24 Hour Fitness',
            'Papi Laundry',
            'First Street Barber',
          ].join(' - '),
          thumbnail: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efaa8602d9c1d0b98bc0519_Generation%20Grove%20Computer%20Lounge%20-%2005.jpg',
          media: [
            {
              type: 'embed/googlemaps',
              placeId: 'ChIJ088XXn4sDogR6rRFN3pnZlc',
              pos: [ 0, 0 ],
              dim: [ 6, 4 ]
            }
          ]
        }
      ]
    }
  }
}

const GalleryPage = () => {
  return <>
    <Helmet title='Gallery' />
    <Gallery {...data.lineups.gallery} />
  </>
}

export default GalleryPage

