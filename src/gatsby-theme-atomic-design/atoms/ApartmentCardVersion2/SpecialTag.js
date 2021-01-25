import styled from 'styled-components'

import SpecialTag from 'gatsby-theme-atomic-design/src/atoms/ApartmentCardVersion2/SpecialTag'

const CustomSpecialTag = styled(SpecialTag)`
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.fontColorWithBackground.secondary};
`

export default CustomSpecialTag
