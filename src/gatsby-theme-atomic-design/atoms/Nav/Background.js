import styled from 'styled-components'

import Background from 'gatsby-theme-atomic-design/src/atoms/Nav/Background'

const CustomBackground = styled(Background).attrs({
  type: 'white',
})`
  border-bottom: 1px solid ${ props => props.theme.colors.gray200 };
`

export default CustomBackground
