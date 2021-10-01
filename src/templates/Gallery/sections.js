const getMatterportModelId = src => {
  const [, modelId] = src.match(/\?m=([^&]+)/)
  return modelId
}

const buildSections = props => {
  const {
    playlist,
    mediaGallery,
    floorplanVirtualTours,
    communityVirtualTours,
    googlePlaceId,
  } = props

  const sections = []

  if (playlist && playlist.length > 0) {
    sections.push({
      title: 'Intro',
      thumbnail: 'https://cdn.filestackcontent.com/GPOX9fSFR52ajC9CAvZq',
      media: playlist.map((video, i) => ({
        ...video,
        url: video.src,
        // TODO: determine correct type
        type: 'video/mp4',
        pos: [ 0, i * 9 ],
        dim: [ 16, 9 ],
      }))
    })
  }

  if (mediaGallery && mediaGallery.length > 0) {
    const [first] = mediaGallery
    sections.push({
      title: 'Photo Gallery',
      thumbnail: first.src,
      media: mediaGallery.map((image, i) => ({
        ...image,
        // TODO: determine correct type
        type: 'image/jpeg',
        pos: [ 0, i * 9 ],
        dim: [ 16, 9 ],
      }))
    })
  }

  if (floorplanVirtualTours && floorplanVirtualTours.length > 0) {
    sections.push({
      title: 'Floorplans',
      thumbnail: 'https://cdn.filestackcontent.com/QGOW0fYIToIcABzgHBpQ',
      media: floorplanVirtualTours.map(({ src, ...tour }, i) => ({
        ...tour,
        type: 'embed/matterport',
        modelId: getMatterportModelId(src),
        pos: [ 0, i * 9 ],
        dim: [ 16, 9 ],
      }))
    })
  }

  if (communityVirtualTours && communityVirtualTours.length > 0) {
    sections.push({
      title: 'Community',
      thumbnail: 'https://cdn.filestackcontent.com/FijLdgN0QSaeIrsYj9OA',
      media: communityVirtualTours.map(({ src, ...tour }, i) => ({
        ...tour,
        type: 'embed/matterport',
        modelId: getMatterportModelId(src),
        pos: [ 0, i * 9 ],
        dim: [ 16, 9 ],
      }))
    })
  }

  if (googlePlaceId) {
    sections.push({
      title: 'Neighborhood',
      thumbnail: 'https://cdn.filestackcontent.com/1hQllDaQTyuFnl8LoYmR',
      media: [
        {
          type: 'embed/googlemaps',
          placeId: googlePlaceId,
          pos: [ 0, 0 ],
          dim: [ 16, 9 ],
        }
      ]
    })
  }

  return sections
}

export default buildSections
