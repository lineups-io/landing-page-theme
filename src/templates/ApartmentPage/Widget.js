import React, { useState } from 'react'

import {
  Wrapper,
  Bubble,
  Close,
  Iframe,
} from './Widget.styled'

// TODO: add support for landscape layout
const getDimensions = width => ({
  width,
  height: width * 16 / 9,
})

const Widget = ({ _id, title, intro }) => {
  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(320)

  const iframe = {
    title,
    src: `/widgets/${ _id }`,
    ...getDimensions(width),
  }

  // TODO: set bubble text and bg color from widget styles
  const bubble = {
    text: `Let's Tour`,
    poster: intro.poster,
    sources: [{
      src: intro.video,
    }]
  }

  const onMount = ref => {
    if (ref) {
      const rect = ref.parentElement.getBoundingClientRect()
      setWidth(Math.min(rect.width, 425))
    }
  }

  return <Wrapper open={open} ref={onMount}>
    <Bubble onClick={() => setOpen(true)}>
      <span>{bubble.text}</span>
      {bubble.sources.length > 0
        ? <video autoPlay muted loop poster={bubble.poster} preload='auto' tabIndex='-1'>
            {bubble.sources.map((source, i) => <source key={i} {...source} />)}
        </video>
        : null}
    </Bubble>
    <Close onClick={() => setOpen(false)}>&times;</Close>
    <Iframe {...iframe} />
  </Wrapper>
}

export default Widget
