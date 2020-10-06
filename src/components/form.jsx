import React from 'react';
import { Formik, Form, useField } from 'formik';
import styled from 'styled-components'


const MyTextInput = ({ label, ...props }) => {

  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]

  // which we can spread on <input> and also replace ErrorMessage entirely.

  const [field, meta] = useField(props);

  return (

    <>

      <label htmlFor={props.id || props.name}>{label}</label>

      <input className="text-input" {...field} {...props} />

      {meta.touched && meta.error ? (

        <div className="error">{meta.error}</div>

      ) : null}

    </>

  );

};



const MyCheckbox = ({ children, ...props }) => {

  // We need to tell useField what type of input this is

  // since React treats radios and checkboxes differently

  // than inputs/select/textarea.

  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (

    <>

      <label className="checkbox">

        <input type="checkbox" {...field} {...props} />

        {children}

      </label>

      {meta.touched && meta.error ? (

        <div className="error">{meta.error}</div>

      ) : null}

    </>

  );

};



// Styled components ....

const StyledSelect = styled.select`

  /** ... * /

`;



const StyledErrorMessage = styled.div`

  /** ... * /

`;



const StyledLabel = styled.label`

 /** ...* /

`;



const MySelect = ({ label, ...props }) => {

  const [field, meta] = useField(props);

  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};



// And now we can use these

const SignupForm = () => {
  return (
    <>
      <h1>Subscribe!</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          acceptedTerms: false, // added for our checkbox
          jobType: '', // added for our select
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <MyTextInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Jane"
          />
          <MyTextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Doe"
          />
          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@formik.com"
          />
          <MySelect label="Job Type" name="jobType">
            <option value="">Select a job type</option>
            <option value="designer">Designer</option>
            <option value="development">Developer</option>
            <option value="product">Product Manager</option>
            <option value="other">Other</option>
          </MySelect>
          <MyCheckbox name="acceptedTerms">
            I accept the terms and conditions
          </MyCheckbox>
          <button type="submit">Submit</button>
        </Form>
      </Formik>

    </>

  );

};