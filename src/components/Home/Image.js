import styled from 'styled-components'

export default styled.div`
    width: 100%;
    background-color: #ececec;
    border: 1px solid #ccc;
    height: 300px;
    position: relative;
    overflow: hidden;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      object-fit: cover;
      object-position: center center;
    }
`
