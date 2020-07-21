import React from 'react'

import Hero from './Hero'
import Links from './Links'
import About from './About'
import Team from './Team'
import Markets from './Markets'
import Banner from '../Banner'

export default ({ markets }) =>
  <>
    <Banner />
    <Hero />
    <Links />
    <About />
    <Team />
    <Markets markets={markets} />
  </>
