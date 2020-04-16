import styled from 'styled-components'

export const Special = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  & + & {
    margin-top: 7.5px;
  }
`

export const Badge = styled.div`
  display: none;
`
export const Title = styled.div`
  font-weight: 400;
  font-size: 1.25em;
  font-family: Catamaran;

  @media (min-width: 768px) {
    font-size: 2.5em;
  }
`
export const Description = styled.div`
  font-weight: 400;
  font-size: .9em;

  & span {
    margin-left: 5px;
  }

  @media (min-width: 768px) {
    ${ Title } + & {
      padding-left: 10px;
    }
  }
`

export const StyledSpecials = styled.section`
  background: #EFEFEF;

  @media (min-width: 481px) and (max-width: 767px) {
    padding: 0 10px;
  }

  @media (min-width: 320px) and (max-width: 481px) {
    padding: 0;
  }
`

export const SpecialsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  font-size: 16px;
  color: black;
  letter-spacing: -0.2px;
  line-height: 21px;
  min-height: 100px;

  @media (min-width: 768px) {
    align-items: center;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 16px;
  }

  @media (min-width: 320px) and (max-width: 767px) {
    flex-direction: column;
    padding: 20px 0;
  }
`
