import styled from 'styled-components'

import logoUrl from '../Icon/logo.png'

const CustomLogo = styled.img.attrs({
  src: logoUrl,
})`
  margin: 0;
  height: 64px;
  padding: 10px 0;
  margin-left: -10px;
`

export default CustomLogo
