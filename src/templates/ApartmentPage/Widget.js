import React, { useState, useRef } from 'react'

import {
  Wrapper,
  Bubble,
  Close,
  Iframe,
  Spinner,
} from './Widget.styled'

const Widget = ({ _id, title, intro }) => {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const ref = useRef()

  const toggleOpen = () => {
    const { contentWindow } = ref.current || {}
    // When the modal is hidden...
    if (open) {
      const scrollY = document.body.style.top.replace(/px$/, '')
      document.body.style.top = ''
      document.body.style.position = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)

      if (contentWindow) contentWindow.postMessage('close')
    } else {
      document.body.style.top = `-${window.scrollY}px`
      document.body.style.position = 'fixed'

      if (contentWindow) contentWindow.postMessage('open')
    }

    setOpen(!open)
  }

  const iframe = {
    src: `/widgets/${ _id.toLowerCase() }/`,
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
    {loaded || open
      ? <>
      <Close onClick={toggleOpen}>&times;</Close>
      <Iframe>
        {!loaded ? <Spinner /> : null}
        <iframe ref={ref} title={title} {...iframe} />
        </Iframe>
      </>
    : null}
  </Wrapper>
}

export default Widget
