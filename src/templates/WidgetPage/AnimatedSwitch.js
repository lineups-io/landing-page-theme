import React from 'react'
import { Switch } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

import FullPageModal from 'gatsby-theme-atomic-design/src/atoms/FullPageModal'
import FloorplanCardsContainer from 'gatsby-theme-atomic-design/src/atoms/Floorplan/FloorplanCardsContainer'
import FloorplanCardContent from 'gatsby-theme-atomic-design/src/atoms/Floorplan/FloorplanCardContent'
import FloorplanCardContentVertical from 'gatsby-theme-atomic-design/src/atoms/Floorplan/FloorplanCardContentVertical'

const duration = 800

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  > div {
    width: 100%;
    height: 100%;
  }

  .fade-exit {
    display: none;
  }

  .fade-enter-active {
    animation-name: ${ fadeIn };
    animation-duration: ${ duration }ms;
    animation-fill-mode: both;
  }

  .fade-enter {
    opacity: 0;
  }

  .fade-enter-done {
    opacity: 1;
  }

  @media (min-width: 768px) {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.gray900};

    > div:first-child {
      max-width: 375px;
      max-height: 667px;
      position: relative;
      background-color: ${props => props.theme.colors.white};
      overflow: auto;
    }

    ${ FullPageModal } {
      position: absolute;
    }

    ${ FloorplanCardsContainer } {
      overflow: unset;
    }

    ${ FloorplanCardContent } {
      padding: 0;
    }

    ${ FloorplanCardContentVertical } {
      overflow: hidden;
    }
  }
`

const AnimatedSwitch = ({ children }) =>
  <Container>
    <Switch>
      {children}
    </Switch>
  </Container>

export default AnimatedSwitch
