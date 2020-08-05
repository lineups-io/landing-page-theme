import styled from 'styled-components'


import PageHeader from 'gatsby-theme-atomic-design/src/atoms/ContactForm/PageHeader'

const CustomPageHeader = styled(PageHeader)`
  text-shadow: 1px 1px 1px black;

  @media (min-width: 768px) {
    color: ${props => props.theme.colors.white};
  }
`

export default CustomPageHeader
