import React, { useState } from 'react'

import {
  Wrapper,
  Bubble,
  Close,
  Iframe,
} from './Widget.styled'

const Widget = ({ _id, title, intro }) => {
  const [open, setOpen] = useState(false)

  const iframe = {
    title,
    src: `/widgets/${ _id }`,
  }

  // TODO: set bubble text and bg color from widget styles
  const bubble = {
    text: `Let's Tour`,
    poster: intro.poster,
    sources: [{
      src: intro.video,
    }]
  }

  return <Wrapper open={open}>
    <Bubble onClick={() => setOpen(true)}>
      <span>{bubble.text}</span>
      {bubble.sources.length > 0
        ? <video autoPlay muted loop poster={bubble.poster} preload='auto' tabIndex='-1'>
            {bubble.sources.map((source, i) => <source key={i} {...source} />)}
        </video>
        : null}
    </Bubble>
    <Iframe>
    <Close onClick={() => setOpen(false)}>&times;</Close>
      <iframe {...iframe} />
    </Iframe>
  </Wrapper>
}

export default Widget
