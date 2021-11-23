import React, { useState, useEffect } from 'react'

import NavButton from 'gatsby-theme-atomic-design/src/molecules/MultipleChoiceQuestion/NavButton'

const utm = 'utm_lineups'

const NavLeft = props => {
  const [hide, setHide] = useState()

  useEffect(() => {
    const [,qs] = window.location.href.split('?')
    if (qs) {
      const query = {}
      qs.split('&').forEach(str => {
        const [key, val] = str.split('=')
        query[key] = val
      })

      if (query[utm]) setHide(true)
    }
  }, [])

  return hide ? null : <NavButton direction='left' text='Back' {...props} />
}

export default NavLeft
