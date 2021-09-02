import styled from 'styled-components'

import Background from 'gatsby-theme-atomic-design/src/atoms/Background'
import Row from 'gatsby-theme-atomic-design/src/atoms/Row'
import Col from 'gatsby-theme-atomic-design/src/atoms/Col'

const CustomBackground = styled(Background).attrs({
  as: 'nav',
  type: 'white',
})`
  position: fixed;
  z-index: 1020;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;

  ${Row} {
    padding: 0;
  }

  ${Row} > ${Col}:first-child {
    align-items: flex-start;
  }

  ${Row} > ${Col}:last-child {
    align-items: flex-end;
    padding-right: 0;
  }
`

export default CustomBackground
