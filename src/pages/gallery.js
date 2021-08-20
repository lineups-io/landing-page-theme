import React from 'react'

import Gallery from 'gatsby-theme-lineups/src/templates/Gallery'

const data = {
  lineups: {
    gallery: {
      sections: [
        {
          title: 'Community Amenities',
          description: [
            'Executive Business Center with Computers',
            'Fitness Center with Cardio and Strength Training Equipment',
            'Bark Park with Interactive Obstacle Courses',
            'Grand Lobby with HDTV’s & Premium Audio System',
            'Reserved Parking',
            'Game Room & Billiards',
          ].join(' - '),
          thumbnail: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efaa85e00afb001546c3b83_Generation%20Grove%20Clubhouse%20-%2009.jpg',
          media: [
            {
              type: 'image/jpeg',
              src: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efaa8606f2d729ef8a38363_Generation%20Grove%20Clubhouse%20-%2001-p-800.jpeg',
              pos: [ 0, 0 ],
              dim: [ 6, 4 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efa3af8e25cabd19c815261_Generation%20Grove%20Ext%20-%2017-p-500.jpeg',
              pos: [ 0, 4 ],
              dim: [ 3, 2 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efa3af8b3dc2eda0a29da97_Generation%20Grove%20Ext%20-%2018-p-500.jpeg',
              pos: [ 3, 4 ],
              dim: [ 3, 2 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efa3af7eacd386f68b6a665_Generation%20Grove%20Ext%20-%2005-p-800.jpeg',
              pos: [ 0, 6 ],
              dim: [ 6, 4 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efa3af8d10f99c4b6e77f80_Generation%20Grove%20Ext%20-%2027-p-500.jpeg',
              pos: [ 0, 10 ],
              dim: [ 3, 2 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efa3af705b7050a50c905c5_Generation%20Grove%20Ext%20-%2025-p-500.jpeg',
              pos: [ 3, 10 ],
              dim: [ 3, 2 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efa3c037233834abf9f4773_Generation%20Grove%20Pool%20-%2011.jpg',
              pos: [ 0, 12 ],
              dim: [ 6, 4 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efa3c03fe180ee1f2268e2b_Generation%20Grove%20Pool%20-%2009.jpg',
              pos: [ 0, 16 ],
              dim: [ 3, 2 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efa3c03932506f68180754e_Generation%20Grove%20Pool%20-%2010.jpg',
              pos: [ 3, 16 ],
              dim: [ 3, 2 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efa3c0244f50b46ca8afc8b_Generation%20Grove%20Pool%20-%2004.jpg',
              pos: [ 0, 18 ],
              dim: [ 6, 4 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efa3cf65e48307846da15c3_Generation%20Grove%20Fitness%20-%2010.jpg',
              pos: [ 0, 22 ],
              dim: [ 6, 4 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efa3cf6f592d9841b47c604_Generation%20Grove%20Fitness%20-%2012.jpg',
              pos: [ 0, 26 ],
              dim: [ 3, 2 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efa3cf7eacd387d99b6a903_Generation%20Grove%20Fitness%20-%2011.jpg',
              pos: [ 3, 26 ],
              dim: [ 3, 2 ]
            },
            {
              type: 'embed/matterport',
              src: 'https://my.matterport.com/show/?model=rujPE16xpmV&wh=0',
              pos: [ 0, 28 ],
              dim: [ 6, 4 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efa39be24846502ee51020b_Generation%20Grove%20Clubhouse%20-%2008-p-800.jpeg',
              pos: [ 0, 32 ],
              dim: [ 6, 4 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efaa860f11e6b425e09de7e_Generation%20Grove%20Clubhouse%20-%2003-p-800.jpeg',
              pos: [ 0, 36 ],
              dim: [ 6, 4 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efaa8606f2d729ef8a38363_Generation%20Grove%20Clubhouse%20-%2001-p-800.jpeg',
              pos: [ 0, 40 ],
              dim: [ 3, 2 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efaa8602d9c1d0b98bc0519_Generation%20Grove%20Computer%20Lounge%20-%2005.jpg',
              pos: [ 3, 40 ],
              dim: [ 3, 2 ]
            },
            {
              type: 'embed/matterport',
              src: 'https://my.matterport.com/show/?model=X9BFv8qoBq3&wh=0',
              pos: [ 0, 42 ],
              dim: [ 6, 4 ]
            },
            {
              type: 'embed/matterport',
              src: 'https://my.matterport.com/show/?model=iSsTMgCeZkp&wh=0',
              pos: [ 0, 46 ],
              dim: [ 6, 4 ]
            },
          ]
        },
        {
          title: 'Home',
          description: [
            'Executive Business Center with Computers',
            'Fitness Center with Cardio and Strength Training Equipment',
            'Bark Park with Interactive Obstacle Courses',
            'Grand Lobby with HDTV’s & Premium Audio System',
            'Reserved Parking',
            'Game Room & Billiards',
          ].join(' - '),
          thumbnail: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efa9e8bea363f3dd17d00cc_Generation%20Grove%201x1%20Model%20-%20bed%2020.jpg',
          media: [
            {
              type: 'image/jpeg',
              src: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efa9e8cc6178f9659922378_Generation%20Grove%201x1%20Model%20-%2008-p-800.jpeg',
              pos: [ 0, 0 ],
              dim: [ 6, 4 ]
            },
            {
              type: 'embed/matterport',
              src: 'https://my.matterport.com/show/?model=22HUmzfA8gC&wh=0',
              pos: [ 0, 4 ],
              dim: [ 6, 4 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efa9e8c7c7446fe36f4a060_Generation%20Grove%201x1%20Model%20-%2009-p-500.jpeg',
              pos: [ 0, 8 ],
              dim: [ 3, 2 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efa9e88acf48152f0c11c43_Generation%20Grove%201x1%20Model%20-%20kitchen-%2001-p-500.jpeg',
              pos: [ 3, 8 ],
              dim: [ 3, 2 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efa9e1fbd965c37119d49dd_Generation%20Grove%201x1%20Model%20-%20living%2011-p-800.jpeg',
              pos: [ 0, 10 ],
              dim: [ 6, 4 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efa9e1fe56db32cfbcc3cbc_Generation%20Grove%201x1%20Model%20-%20nook15-p-500.jpeg',
              pos: [ 0, 14 ],
              dim: [ 3, 2 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efa9e889a61b35a7c0e12da_Generation%20Grove%201x1%20Model%20-%20laundry%2006-p-800.jpeg',
              pos: [ 3, 14 ],
              dim: [ 3, 2 ]
            },
            {
              type: 'image/jpeg',
              src: 'https://assets.website-files.com/5ed193e524047375a5db54c2/5efa9e8a2d9c1d6878bbf31b_Generation%20Grove%201x1%20Model%20-%20bed%2022-p-800.jpeg',
              pos: [ 0, 16 ],
              dim: [ 6, 4 ]
            },
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
              placeId: 'ChIJyVyFsVKyQIYR6T2S0SIVTiY',
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
  return <Gallery {...data.lineups.gallery} />
}

export default GalleryPage

