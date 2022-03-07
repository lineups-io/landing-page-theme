import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'

import Icon from 'gatsby-theme-atomic-design/src/atoms/Icon'

export const Close = styled.button`
  padding: 0;
  width: 25px;
  height: 25px;
  border: 0;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  position: absolute;
  top: 12.5px;
  right: 12.5px;
  cursor: pointer;
  z-index: 2;

  @media (min-width: 768px) {
    left: calc(375px + 20px - (25px / 2));
    top: calc(100% - 20px - (375px * 1.7778) - (25px / 2));
  }
`

export const Bubble = styled.button`
  width: 128px;
  height: 128px;
  border: 5px solid #192c51;
  border-radius: 50%;
  background-color: #192c51;
  padding: 0;
  color: #fff;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 20px;

  span {
    background-color: rgba(0, 0, 0, 0.2);
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  video {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    object-position: 50% 50%;
  }

  transition: transform .2s ease-in-out;
  &:hover {
    transform: scale(1.05, 1.05);
  }
`

export const Hide = styled.button`
  cursor: pointer;
  background-color: #192c51;
  padding: 0 10px;
  color: #fff;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -22.5px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;

  @media (min-width: 768px) {
    display: none;

    &:hover, ${ Bubble }:hover + & {
      display: flex !important;
    }
  }
`

export const Iframe = styled.div`
  position: relative;
  width: 100%;
  max-width: 425px;
  max-height: 100%;
  background-color: #fff;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  height: 100%;

  @media (min-width: 768px) {
    height: fit-content;

    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 0;
      padding-top: 177.78%;
    }
  }

  iframe {
    margin: 0;
    border: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  @media (min-width: 768px) {
    margin: 20px;
    max-width: 375px;
    border-radius: 12px;
    overflow: hidden;
  }
`

export const Wrapper = styled(motion.div).attrs({
  animate: {
    scale: [0, 1.1, 1],
    y: ['100%', '0%', '0%'],
  },
  transition: { duration: 1.2, delay: 1 },
})`
  position: fixed;
  bottom: 0;
  left: ${props => props.hide && !props.open ? -125 : 0}px;
  transition: left 200ms;
  z-index: 100000;

  background-color: ${ props => props.open ? 'rgba(0, 0, 0, 0.8)' : 'transparent' };
  width: ${ props => props.open ? '100%' : undefined };
  height: ${ props => props.open ? '100%' : undefined };
  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    align-items: ${ props => props.open ? 'flex-end' : '' };
  }

  ${ Bubble }, ${ Hide } {
    display: ${ props => props.open ? 'none' : '' };
  }

  ${ Hide } {
    display: ${ props => props.hide ? 'none' : '' };
  }

  ${ Iframe }, ${ Close } {
    display: ${ props => props.open ? '' : 'none' };
  }
`

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const Spinner = styled(Icon).attrs({
  icon: 'Spinner',
  size: '2x',
})`
  color: #000;
  position: absolute;
  top: calc(50% - 16px);
  left: calc(50% - 16px);

  animation: ${ rotate } 2s infinite;
`
