const base = {
  styles: {
    root: {
      WebkitFontSmoothing: 'antialiased',
      letterSpacing: '1px',
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
    primary: '#F4A261',
    secondary: '#337BB7',
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
