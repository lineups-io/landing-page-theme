import React from 'react'

import { Container } from './styled'

const styles = {
  bgColor: {
    backgroundColor: '#37bad1',
  },
  bgImage: {
    backgroundImage: 'url("https://lives2residential.com/assets/images/cache/5700-boca-raton-blvd-fort-worth-tx-76112-High-Res-7-c63e9821de2c55ef042ce7cfee89866d.jpg")',
  },
}

const Header = () => {
  return (
    <Container>
      <div className='page-banner has-image'>
        <div className='page-banner__image viewed in-viewport' data-in-viewport=''>
          <div className='page-banner__image-wrap' style={styles.bgColor}>
            <div className='page-banner__image-asset lazyload lazyload--loaded' style={styles.bgImage}></div>
          </div>
        </div>
        <div className='page-banner__wrap'>
          <div className='page-banner__container' style={styles.bgColor}>
            <section className='page-banner__content viewed in-viewport' data-in-viewport=''>
              <h1 className='page-banner__title'>Live with us</h1>
              <p className='page-banner__text'>Discover one-of-a-kind communities, with distinctive design inside and out. Find yourself at an S2 community.</p>
            </section>
          </div>
          <div className='page-banner__filler'></div>
        </div>
      </div>
    </Container>
  )
}

export default Header
