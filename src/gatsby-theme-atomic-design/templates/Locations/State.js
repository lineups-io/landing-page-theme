import styled from 'styled-components'

import State from 'gatsby-theme-atomic-design/src/templates/Locations/State'

import List from 'gatsby-theme-atomic-design/src/atoms/List'

const CustomState = styled(State)`
  ${List}:before {
    position: absolute;
    display: block;
    content: " ";
    height: 2px;
    width: 20px;
    background-color: ${ props => props.theme.colors.primary };
  }
`

export default CustomState
