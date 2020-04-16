import React from 'react'
import styled from 'styled-components'

import image from './image.png'

const Wrapper = styled.div`
  margin-top: 80px;
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 70.868%;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
`

export default () => <Wrapper id='floor-plan'><img alt='mock-up' src={image} /></Wrapper>
