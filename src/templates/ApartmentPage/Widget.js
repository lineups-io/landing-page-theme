import React, { useState } from 'react'

import {
  Wrapper,
  Bubble,
  Close,
  Iframe,
} from './Widget.styled'

const Widget = ({ _id, title, intro }) => {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const toggleOpen = () => {
    // When the modal is hidden...
    if (open) {
      const scrollY = document.body.style.top
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.position = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    } else {
      document.body.style.top = `-${window.scrollY}px`
      document.body.style.width = '100%'
      document.body.style.position = 'fixed'
    }

    setOpen(!open)
  }

  const iframe = {
    title,
    src: `/widgets/${ _id }`,
    onLoad: () => setLoaded(true),
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
    <Bubble onClick={toggleOpen}>
      <span>{bubble.text}</span>
      {bubble.sources.length > 0
        ? <video playsInline autoPlay muted loop poster={bubble.poster} tabIndex='-1'>
            {bubble.sources.map((source, i) => <source key={i} {...source} />)}
        </video>
        : null}
    </Bubble>
    {loaded || open ? <Iframe>
      <Close onClick={toggleOpen}>&times;</Close>
      <iframe {...iframe} />
    </Iframe> : null}
  </Wrapper>
}

export default Widget
