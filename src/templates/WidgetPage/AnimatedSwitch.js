import styled from 'styled-components'

import FullPageModal from 'gatsby-theme-atomic-design/src/atoms/FullPageModal'
import FloorplanCardsContainer from 'gatsby-theme-atomic-design/src/atoms/Floorplan/FloorplanCardsContainer'
import FloorplanCardContent from 'gatsby-theme-atomic-design/src/atoms/Floorplan/FloorplanCardContent'
import FloorplanCardContentVertical from 'gatsby-theme-atomic-design/src/atoms/Floorplan/FloorplanCardContentVertical'

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

export default Container
