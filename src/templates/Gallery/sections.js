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
      // TODO: get a better thumbnail
      thumbnail: 'https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807',
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
      // TODO: get a better thumbnail
      thumbnail: 'https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807',
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
      // TODO: get a better thumbnail
      thumbnail: 'https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807',
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
      // TODO: get a better thumbnail
      thumbnail: 'https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807',
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
