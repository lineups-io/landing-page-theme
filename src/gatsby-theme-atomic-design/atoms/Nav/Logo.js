import styled from 'styled-components'

import Logo from 'gatsby-theme-atomic-design/src/atoms/Nav/Logo'

import logoUrl from './logo.jpeg'

const CustomLogo = styled(Logo).attrs({
  as: 'img',
  src: logoUrl,
})`
  margin: 0 0 0 -15px;
  width: 171px;
  height: 64px;
`

export default CustomLogo
