const CLASSNAME = {
  Wrapper: 'lineups___wrapper',
  Bubble: 'lineups___bubble',
  Hide: 'lineups___hide',
  IframeContainer: 'lineups___iframe-container',
  Iframe: 'lineups___iframe',
  Widget: 'lineups___widget',
  Close: 'lineups___close',
  Spinner: 'lineups___spinner lds-hourglass',
}

const createElement = function(tag, attributes) {
  const elem = document.createElement(tag)

  Object.keys(attributes || {}).forEach(function setAttribute(key) {
    elem.setAttribute(key, attributes[key])
  })

  return elem
}

class Lineups {
  constructor(intro, widget) {
    this.widget = widget

    const wrapper = createElement('div', {
      class: CLASSNAME.Wrapper,
    })

    const bubble = createElement('div', {
      class: CLASSNAME.Bubble
    })
    bubble.onclick = this.toggleOpen.bind(this)

    const span = createElement('span')

    const video = createElement('video', {
      playsInline: '',
      loop: '',
      poster: intro.poster,
      tabIndex: -1
    })
    video.oncanplay = function(e) {
      e.target.muted = true
      e.target.play()
    }

    const source = createElement('source', {
      src: intro.video
    })

    video.appendChild(source)

    bubble.appendChild(span)
    bubble.appendChild(video)

    wrapper.appendChild(bubble)

    const hide = createElement('button', {
      class: CLASSNAME.Hide,
    })
    hide.innerHTML = 'Hide'
    hide.onclick = this.toggleHide.bind(this)
    this.hide = hide

    wrapper.appendChild(hide)

    document.body.appendChild(wrapper)
    this.wrapper = wrapper
  }

  destroy() {
    if (this.wrapper) document.body.removeChild(this.wrapper)
  }

  toggleOpen() {
    if (this.wrapper.className.match(/ open$/)) this.close()
    else this.open()
  }

  toggleHide() {
    if (this.wrapper.className.match(/ hide/)) {
      this.wrapper.className = this.wrapper.className.replace(/ hide/g, '')
      this.hide.innerHTML = 'Hide'
    } else {
      this.wrapper.className = this.wrapper.className + ' hide'
      this.hide.innerHTML = 'Unhide'
    }
  }

  open() {
    if (!this.iframe) {
      const iframeContainer = createElement('div', {
        class: CLASSNAME.IframeContainer
      })

      const closeButton = createElement('button', {
        class: CLASSNAME.Close
      })
      closeButton.innerHTML = '&times;'
      closeButton.onclick = this.toggleOpen.bind(this)

      const spinner = createElement('div', {
        class: CLASSNAME.Spinner
      })

      const iframe = createElement('iframe', {
        class: CLASSNAME.Iframe,
        title: this.widget.title,
        src: this.widget.src,
      })
      iframe.onload = function() {
        iframeContainer.removeChild(spinner)
      }

      iframeContainer.appendChild(closeButton)
      iframeContainer.appendChild(spinner)
      iframeContainer.appendChild(iframe)

      this.wrapper.appendChild(iframeContainer)
      this.iframe = iframe
    }

    this.wrapper.className = `${CLASSNAME.Wrapper} open`
    if (this.iframe && this.iframe.postMessage) this.iframe.postMessage('open')
  }

  close() {
    this.wrapper.className = CLASSNAME.Wrapper
    if (this.iframe && this.iframe.postMessage) this.iframe.postMessage('close')
  }
}
