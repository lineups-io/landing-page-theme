const base = {
  styles: {
    root: {
      WebkitFontSmoothing: 'antialiased',
      letterSpacing: '1px',
    },
  },
  fonts: {
    body: 'Avenir, sans-serif',
    heading: 'Avenir, sans-serif',
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
    primary: '#007AB8',
    secondary: '#007AB8',
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
