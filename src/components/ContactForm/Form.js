import styled from 'styled-components'

import Col from 'gatsby-theme-atomic-design/src/atoms/Col'

const Form = styled(Col).attrs({
  'as': 'form',
  'data-netlify': true,
  'netlify-honeypot': 'bot-field',
})`
  background-color: ${ props => props.theme.colors.white };
  width: 100%;
  margin: 0 ${ props => props.theme.gutter * 2 }px;

  @media (min-width: 768px) {
    box-shadow: 0px 0px 2px 2px rgba(39, 40, 59, 0.2);
    padding:
    ${ props => props.theme.gutter * 2 }px
    ${ props => props.theme.gutter * 3 }px;
  }
`

Form.Header = styled.h3`
  width: 100%;
  font-weight: 500;
  font-size: 1.75rem;
`

Form.Col = styled(Col)`
  width: 100%;

  @media (min-width: 768px) {
    width: 50%;
  }
`

Form.Buttons = styled(Col)`
  text-align: right;
`

Form.Submit = styled.button`
  background-color: ${ props => props.theme.colors.primary };
  color: ${ props => props.theme.colors.white };
  border: 0;
  padding: 5px 40px;
  margin-top: 20px;
`

Form.InputGroup = styled.div`
  padding-bottom: ${ props => props.theme.gutter * 2 / 3 }px;
`

Form.Label = styled.label`
    width: 100%;
    display: block;
    font-color: ${ props => props.theme.colors.gray700 };
    font-size: .9em;
    line-height: 1.5em;
    padding-bottom: ${ props => props.theme.gutter * 1 / 3 }px;
`

Form.Input = styled(Form.Label).attrs({ as: 'input' })`
    height: 32px;
    background-color: ${ props => props.theme.colors.gray200 };
    border: 1px solid ${ props => props.theme.colors.gray300 };
    border-radius: 5px;
    padding: 5px;
`

Form.Select = styled(Form.Input).attrs({ as: 'select' })`
`

Form.Textarea = styled(Form.Input).attrs({ as: 'textarea' })`
   height: 93px;
`

export default Form
