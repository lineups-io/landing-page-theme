const origin = window.location.origin
const css = '/widget.css'

const CLASSNAME = {
  Wrapper: 'lineups___wrapper',
  Bubble: 'lineups___bubble',
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
    span.innerHTML = 'Let\'s Tour'

    const video = createElement('video', {
      playsInline: '',
      autoPlay: '',
      muted: '',
      loop: '',
      poster: intro.poster,
      tabIndex: -1
    })

    const source = createElement('source', {
      src: intro.video
    })

    video.appendChild(source)

    bubble.appendChild(span)
    bubble.appendChild(video)

    wrapper.appendChild(bubble)

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

window.onload = function load() {
  const stylesheet = createElement('link', {
    href: `${origin}${css}`,
    type: 'text/css',
    rel: 'stylesheet'
  })
  document.head.appendChild(stylesheet)
}
