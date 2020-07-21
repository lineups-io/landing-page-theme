import styled from 'styled-components'

import Col from 'gatsby-theme-atomic-design/src/atoms/Col'
import Link from 'gatsby-theme-atomic-design/src/atoms/Link'

const Banner = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #212f3a;

  ${ Col } {
    flex: 1 1 100%;
  }

  @media (min-width: 768px) {
    ${ Col } {
      flex: 1;
      align-items: flex-end;
    }
    ${ Col }:first-child {
      flex: 3;
      align-items: center;
    }
  }
`

Banner.Title = styled.div`
  font-family: Avenir, sans-serif;
  line-height: 45px;
  font-weight: 900;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 0px;
  color: #fff;
  font-size: 22px;
  text-align: center;
`

Banner.SubTitle = styled.div`
  font-family: 'Open Sans', sans-serif;
  line-height: 37px;
  font-weight: 300;
  letter-spacing: -1px;
  margin-top: 0px;
  margin-bottom: 0px;
  padding-top: 0px;
  color: #fff;
  font-size: 22px;
  text-align: center;
`

Banner.Link = styled(Link)`
  display: block;
  margin-top: 25px;
  margin-bottom: auto;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 3px;
  background-color: #0085ca;
  color: #fff;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;

  &[href]:hover {
    color: #fff;
    text-decoration: none;
  }
`

export default Banner
