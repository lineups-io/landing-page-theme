import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import GatsbyImage from 'gatsby-image/withIEPolyfill'

import Form from './Form'
import { Container, Row } from 'gatsby-theme-core/src/components/Layout/styled'

import {
  Page,
  BackgroundImage,
  PageHeader,
  Title,
  Subheader,
} from './styled'

const feedbackTypes = [
  'I have a question/comment about a community',
  'I have a question/comment for Rockstar',
  'I\'m interested in becoming a vendor',
  'I\'m a resident with a question',
  'Other',
]

export default ({ apartments }) => {
  const { background } = useStaticQuery(graphql`
    query getContactFormData {
      background: file(relativePath: { eq: "contact-us/background.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1600 cropFocus: CENTER) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return <Page>
    <BackgroundImage>
      <GatsbyImage fluid={background.childImageSharp.fluid} />
    </BackgroundImage>
    <Container>
      <Row>
        <PageHeader>
          <Title>How Can We Help?</Title>
          <Subheader>
            Questions, feedback, suggestions ... we want to know!
          </Subheader>
        </PageHeader>
      </Row>
      <Row>
        <Form action='/success/' name='contact' method='POST'>
          <input type='hidden' name='form-name' value='contact' />
          <input type='hidden' name='bot-field' />
          <Form.Header>General Feedback</Form.Header>
          <Row>
            <Form.Col>
              <Form.InputGroup>
                <Form.Label htmlFor='name'>
                  Name
                </Form.Label>
                <Form.Input id='name' type='text' name='name' required />
              </Form.InputGroup>
              <Form.InputGroup>
                <Form.Label htmlFor='email'>
                  Email
                </Form.Label>
                <Form.Input id='email' type='email' name='email' required />
              </Form.InputGroup>
              <Form.InputGroup>
                <Form.Label htmlFor='phone' required>
                  Phone (Optional)
                </Form.Label>
                <Form.Input id='phone' type='tel' name='phone' />
              </Form.InputGroup>
            </Form.Col>
            <Form.Col>
              <Form.InputGroup>
                <Form.Label htmlFor='feedbackType'>
                  Type of Feedback
                </Form.Label>
                <Form.Select id='feedbackType' name='feedbackType' required>
                  {feedbackTypes.map((type, key) =>
                    <option key={key} value={type}>{type}</option>
                  )}
                </Form.Select>
              </Form.InputGroup>
              <Form.InputGroup>
                <Form.Label htmlFor='apartment'>
                  Community
                </Form.Label>
                <Form.Select id='apartment' name='apartment' required>
                  <option value=''>Not applicable</option>
                  {apartments.map((apartment, key) =>
                    <option key={key} value={apartment.name}>{apartment.name}</option>
                  )}
                </Form.Select>
              </Form.InputGroup>
              <Form.InputGroup>
                <Form.Label htmlFor='comment'>
                  Comment
                </Form.Label>
                <Form.Textarea id='comment' name='comment' required />
              </Form.InputGroup>
            </Form.Col>
            <Form.Buttons>
              <Form.Submit>Submit</Form.Submit>
            </Form.Buttons>
          </Row>
        </Form>
      </Row>
    </Container>
  </Page>
}
