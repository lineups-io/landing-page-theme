import React from 'react'
import { Switch } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import {
  TransitionGroup,
  CSSTransition
} from 'react-transition-group'

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
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.gray900};

    > div:first-child {
      max-width: 375px;
      max-height: 667px;
      position: relative;
      background-color: ${props => props.theme.colors.white};
    }
  }
`

const AnimatedSwitch = ({ location, children }) =>
  <Container>
    <TransitionGroup>
      <CSSTransition key={location.hash} classNames='fade' timeout={duration}>
        <Switch location={location}>
          {children}
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  </Container>

export default AnimatedSwitch
