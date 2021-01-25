import React from 'react'

import VirtualTours from 'gatsby-theme-atomic-design/src/organisms/Sections/VirtualTours'

export default props => props.tours && props.tours.length > 0 ? <VirtualTours {...props} /> : null
