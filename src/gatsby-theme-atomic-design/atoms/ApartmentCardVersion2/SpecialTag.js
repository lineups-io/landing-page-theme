import styled from 'styled-components'

import SpecialTag from 'gatsby-theme-atomic-design/src/atoms/ApartmentCardVersion2/SpecialTag'

const CustomSpecialTag = styled(SpecialTag)`
  background: ${props => props.theme.colors.gray300};
  color: ${props => props.theme.fontColorWithBackground.gray300};
`

export default CustomSpecialTag
