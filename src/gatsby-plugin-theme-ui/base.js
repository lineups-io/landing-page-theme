const base = {
  styles: {
    root: {
      WebkitFontSmoothing: 'antialiased',
    },
  },
  fonts: {
    body: 'proxima-nova, sans-serif',
    heading: 'utopia-std, serif',
  },
  text: {
    heading: {
      marginBottom: 3,
    },
    paragraph: {
      marginBottom: 4,
    },
  },
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#005089',
    secondary: '#00aea7',
    muted: '#f6f6f6',
  },
  breakpoints: [
    '768px',
    '1024px',
    '1280px',
  ],
  sizes: {
    container: 1340,
  },
}

export default base
