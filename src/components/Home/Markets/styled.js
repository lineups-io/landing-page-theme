import styled from 'styled-components'

import Link from 'gatsby-theme-atomic-design/src/atoms/Link'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap
`

export const Card = styled(Link)`
  display: block;
  padding: 0;
  position: relative;
  width: 100%;
  transition: filter 200ms ease;

  @media (min-width: 768px) {
    width: 33.33%;
  }
`

export const Caption = styled.div`
  display: block;
  width: 100%;
  position: absolute;
  top: calc(50% - 25px);
  height: 50px;
  background-color: rgba(16, 26, 36, .5);
  font-size: 1.5em;
  font-weight: 400;
  line-height: 50px;
  text-align: center;
  color: #fff;
`
