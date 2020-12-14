import styled from 'styled-components'

export const Close = styled.button`
  width: 25px;
  height: 25px;
  border: 0;
  border-radius: 50% 50%;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  position: absolute;
  top: 12.5px;
  right: 12.5px;
  cursor: pointer;
`

export const Bubble = styled.button`
  width: 128px;
  height: 128px;
  border: 5px solid #192c51;
  border-radius: 50% 50%;
  background-color: #192c51;
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
    display: flex;
    justify-content: center;
    align-items: center;
  }

  video {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
  }
`

export const Iframe = styled.iframe`
  background-color: #fff;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  margin: 0;
  border: 0;

  @media (min-width: 768px) {
    border-radius: 12px;
    margin: ${ props => props.open ? 0 : 20 }px;
  }
`

export const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1030;

  @media (min-width: 768px) {
    z-index: 1010;
  }

  ${ Bubble } {
    display: ${ props => props.open ? 'none' : 'block' };
  }

  ${ Close }, ${ Iframe } {
    display: ${ props => props.open ? 'block' : 'none' };
  }

  ${ Iframe } {
    max-width: ${ props => props.open ? '425px' : 0 };
    max-height: ${ props => props.open ? `${ 425 * 1.7778 }px` : 0 };
  }
`