import React, { useState } from 'react';
import { Link } from 'gatsby'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

import { breakpoints, colors } from '../utils/styles';


// const Container = styled.div`

// `


const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 80%;
    max-height: 500px;
    width: 90%;
    max-width: 600px;
    margin: 0 auto;
    font-weight: bold;

    .form-child {
    display: block;
    width: 90%;
    background: rgba(0,0,0,.7);
    border: 1px solid white;
    color: white;
    padding: 8px;
    font-weight: bold;
    }

    label {
        align-self: flex-start;
    }

    .error {
        font-size: 12px;
        color: red;
        width: 400px;
        &:before {
          content: "❌ ";
          font-size: 10px;
        }
    }

    #submit-button {
        font-family: inherit;
        border: 0;
        background: ${colors.brand};
        color: ${colors.lightest};
        padding-top: 10px;
        padding-bottom: 10px;
        width: 90px;
    }

`

// Styled components ....
const StyledSelect = styled.select`

`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: red;
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: "❌ ";
    font-size: 10px;
  }

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
      <label htmlFor={props.id || props.name}>{label}</label>
      <StyledSelect {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

const ErrorMessage = () => {
    return (
        <div>
            <p>There was an error submitting your message.</p>
            <p>Please refresh the the page and try again or email us at</p>
            <p>DARKACEAPPAREL@GMAIL.COM</p>
        </div>
    )
}

const SuccessMessage = () => {
    return (
        <div>
            <p>Thank you for your message.</p>
            <p>We will get back to you as soon as possible</p>
            <Link to='/shop'>See the shop</Link>
        </div>
    )
}


const BasicForm = () => {
    const [ submitted, setSubmitted ] = useState(false)
    const [ isSubmitting, setIsSubmitting ] = useState(false)
    const [ isError, setIsError ] = useState(false)


    const submitData = async (values) => {
        setIsSubmitting(true)
        try {
            const response = await fetch('/.netlify/functions/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(values)
            })

            response.ok ? setSubmitted(true) : setIsError(true)
            setIsSubmitting(false)
   
        } catch(err) {
            setIsError(true)
            setIsSubmitting(false)
        }
    
    };
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          subject: "",
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
            // @see http://bit.ly/yup-mixed-oneOf
            .oneOf(
                ["wholesale", "shipping", "sponsorship", "other"],
                "Invalid Subject"
            )
            .required("Required"),  
            message: Yup.string()
            .required("Required"),
        })}
        onSubmit={async (values, { resetForm }) => {
            await submitData(values)
            resetForm();
        }}
      >
            <StyledForm>
                {isError ? <ErrorMessage /> : isSubmitting ? <p>Submitting...</p> : submitted ? <SuccessMessage /> 
                    : 
                    <>
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
                        <button type='submit' id='submit-button'>Submit</button>
                    </>
                }
            </StyledForm>
      </Formik>
    </>
  );
};


export default BasicForm
