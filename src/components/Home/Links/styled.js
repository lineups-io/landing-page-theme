import styled from 'styled-components'

import { Row } from 'gatsby-theme-core/src/components/Layout/styled'
import Link from 'gatsby-theme-core/src/components/Link'

export const Links = styled(Row)`
  justify-content: center;
`

export const IconLink = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: 0 ${ props => props.theme.gutter }px;
  align-items: center;
  justify-content: center;

  width: 33.33%;

  svg {
    margin-bottom: 15px;
  }

  @media (min-width: 768px) {
    width: auto;
  }
`
