import React, { useState } from 'react'

import Form from 'gatsby-theme-atomic-design/src/atoms/Form/Form'
import FormHeader from 'gatsby-theme-atomic-design/src/atoms/Form/Header'
import FormCol from 'gatsby-theme-atomic-design/src/atoms/Form/Col'
import FormInput from 'gatsby-theme-atomic-design/src/atoms/Form/Input'
import FormInputGroup from 'gatsby-theme-atomic-design/src/atoms/Form/InputGroup'
import FormLabel from 'gatsby-theme-atomic-design/src/atoms/Form/Label'
import FormSelect from 'gatsby-theme-atomic-design/src/atoms/Form/Select'
import FormTextarea from 'gatsby-theme-atomic-design/src/atoms/Form/Textarea'
import FormButtons from 'gatsby-theme-atomic-design/src/atoms/Form/Buttons'
import FormSubmit from 'gatsby-theme-atomic-design/src/atoms/Form/Submit'

import Row from 'gatsby-theme-atomic-design/src/atoms/Row'

export default ({ apartments, feedbackTypes }) => {
  const [forwardTo, setForwardTo] = useState()

  const handleSelect = event => {
    const found = apartments.find(a => a.name === event.target.value)

    if (found) setForwardTo(found.email)
    else setForwardTo()
  }

  return <Form action='/success/' name='contact' method='POST'>
    <FormInput type='hidden' name='form-name' value='contact' />
    <FormInput type='hidden' name='bot-field' />
    <FormInput type='hidden' name='forward-to' value={forwardTo} />
    <FormHeader>General Feedback</FormHeader>
    <Row>
      <FormCol>
        <FormInputGroup>
          <FormLabel htmlFor='firstName'>First Name</FormLabel>
          <FormInput id='firstName' type='text' name='firstName' required />
        </FormInputGroup>
        <FormInputGroup>
          <FormLabel htmlFor='lastName'>Last Name</FormLabel>
          <FormInput id='lastName' type='text' name='lastName' required />
        </FormInputGroup>
        <FormInputGroup>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <FormInput id='email' type='email' name='email' required />
        </FormInputGroup>
        <FormInputGroup>
          <FormLabel htmlFor='phone' required>
            Phone
          </FormLabel>
          <FormInput id='phone' type='tel' name='phone' />
        </FormInputGroup>
      </FormCol>
      <FormCol>
        <FormInputGroup>
          <FormLabel htmlFor='feedbackType'>Type of Feedback</FormLabel>
          <FormSelect id='feedbackType' name='feedbackType' required>
            {feedbackTypes.map((type, key) => (
              <option key={key} value={type}>
                {type}
              </option>
            ))}
          </FormSelect>
        </FormInputGroup>
        <FormInputGroup>
          <FormLabel htmlFor='apartment'>Community</FormLabel>
          <FormSelect id='apartment' name='apartment' required onChange={handleSelect}>
            <option value=''>Not applicable</option>
            {apartments.map((apartment, key) => (
              <option key={key} value={apartment.name}>
                {apartment.name}
              </option>
            ))}
          </FormSelect>
        </FormInputGroup>
        <FormInputGroup>
          <FormLabel htmlFor='comment'>Comment</FormLabel>
          <FormTextarea id='comment' name='comment' required />
        </FormInputGroup>
      </FormCol>
      <FormButtons>
        <FormSubmit>Submit</FormSubmit>
      </FormButtons>
    </Row>
  </Form>
}
