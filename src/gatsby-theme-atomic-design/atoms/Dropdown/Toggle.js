import styled from 'styled-components'

import Toggle from 'gatsby-theme-atomic-design/src/atoms/Dropdown/Toggle'

const CustomToggle = styled(Toggle).attrs({
  type: 'gray200',
})`
  color: ${ props => props.theme.colors.gray700 };
`

export default CustomToggle
