import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

const NAME_ID = 'entry.2005620554'
const EMAIL_ID = 'entry.1045781291'
const SUBJECT_ID = 'entry.1332384896'
const MESSAGE_ID = 'entry.2141769552'

const FormURL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdZjvFQX7fwsgPXiR7MXQqXPthMldADutfaimCZLpqL4i6L2A/formResponse'

const submitData = async (values) => {
    let result
    try {
        const response = await fetch(FormURL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(values)
        })
        console.log({response})

        result = await response.json()
        console.log(result)
        
    } catch(err) {
        return {
            statusCode: err.statusCode || 500,
            body: JSON.stringify({
              error: err.message
            })
          }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: result
      }),
    };
  };

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    max-height: 500px;
    width: 90%;
    max-width: 600px;
    margin: 0 auto;
    font-weight: bold;

    .form-child {
    display: block;
    width: 90%;
    }

    .error {
        font-size: 12px;
        color: red;
        width: 400px;
      //   margin-top: 0.25rem;
        &:before {
          content: "❌ ";
          font-size: 10px;
        }
    }

`

// Styled components ....
const StyledSelect = styled.select`
//   color: var(--blue);
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: red;
  width: 400px;
//   margin-top: 0.25rem;
  &:before {
    content: "❌ ";
    font-size: 10px;
  }

`;

const StyledLabel = styled.label`
//   margin-top: 1rem;
`;

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

const MyTextArea = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <textarea {...field} {...props} />
        {meta.touched && meta.error ? (
            <StyledErrorMessage>{meta.error}</StyledErrorMessage>
        ) : null}
      </>
    );
  };


const MySelect = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
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
const BasicForm = () => {
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          subject: "", // added for our select
          message: ""
        }}
        validationSchema={Yup.object({
            name: Yup.string()
            .max(50, "Must be 50 characters or less")
            .required("Required"),
            email: Yup.string()
            .email("Invalid email addresss`")
            .required("Required"),
            subject: Yup.string()
            // specify the set of valid values for job type
            // @see http://bit.ly/yup-mixed-oneOf
            .oneOf(
                ["wholesale", "shipping", "sponsorship", "other"],
                "Invalid Subject"
            )
            .required("Required"),  
            message: Yup.string()
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
            const formData = {
                [NAME_ID]: values.name,
                [EMAIL_ID]: values.email,
                [SUBJECT_ID]: values.subject,
                [MESSAGE_ID]: values.message
            }
            setTimeout(() => {
                // alert(JSON.stringify(formData, null, 2));
                submitData(formData)
                setSubmitting(false);
              }, 400);
            resetForm();
        }}
      >
        <StyledForm>
          <MyTextInput
            label="Name"
            name="name"
            type="text"
            className='form-child'
          />
          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            className='form-child'
          />
          <MySelect label="Subject" name="subject" className='form-child'>
            <option value="">Select a subject</option>
            <option value="wholesale">Wholesale</option>
            <option value="shipping">Shipping</option>
            <option value="sponsorship">Sponsorship</option>
            <option value="other">Other</option>
          </MySelect>
          <MyTextArea
            label="Message"
            name="message"
            className='form-child'
            rows='5'
            cols='50'
          />
          <button type="submit">Submit</button>
        </StyledForm>
      </Formik>
    </>
  );
};


export default BasicForm
