import styled from 'styled-components'

import Background from 'gatsby-theme-atomic-design/src/atoms/Nav/Background'

const CustomBackground = styled(Background).attrs({
  type: 'primary',
})`
  border-bottom: 1px solid ${ props => props.theme.colors.primary };
`

export default CustomBackground
