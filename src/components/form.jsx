import React, { useState } from 'react';
import { Link } from 'gatsby'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { StyledButton } from './shared/buttons'


import { colors } from '../utils/styles';


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

    .success-link {
      margin-top: 10px;
    }

    .form-child {
      width: 90%;
      background: rgba(0,0,0, 1);
      border: 1px solid white;
      color: white;
      padding: 8px;
      font-weight: bold;
    }

    label {
        width: 100%;
        margin-bottom: 5px;
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
      <label htmlFor={props.id || props.name}>{label}
      <input {...field} {...props} />
      </label>
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
        <label htmlFor={props.id || props.name}>{label}
        <textarea {...field} {...props} />
        </label>
        {meta.touched && meta.error ? (
            <StyledErrorMessage>{meta.error}</StyledErrorMessage>
        ) : null}
      </>
    );
  };


// const MySelect = ({ label, ...props }) => {
//   // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
//   // which we can spread on <input> and alse replace ErrorMessage entirely.
//   const [field, meta] = useField(props);
//   return (
//     <>
//       <label htmlFor={props.id || props.name}>{label}
//       <select {...field} {...props} />
//       </label>
//       {meta.touched && meta.error ? (
//         <StyledErrorMessage>{meta.error}</StyledErrorMessage>
//       ) : null}
//     </>
//   );
// };

const ErrorMessage = () => {
    return (
        <div className='submit-message'>
            <p>There was an error submitting your message.</p>
            <p>Please refresh the the page and try again or email us at</p>
            <p>DARKACEAPPAREL@GMAIL.COM</p>
        </div>
    )
}

const SuccessMessage = () => {
    return (
        <div className='submit-message'>
            <p>Thank you for your message.</p>
            <p>We will get back to you as soon as possible.</p>
            <Link to='/shop' className='success-link'>Click here to see the shop</Link>
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
          // subject: "",
          message: ""
        }}
        validationSchema={Yup.object({
            name: Yup.string()
            .max(50, "Must be 50 characters or less")
            .required("Required"),
            email: Yup.string()
            .email("Invalid email addresss`")
            .required("Required"),
            // subject: Yup.string()
            // // @see http://bit.ly/yup-mixed-oneOf
            // .oneOf(
            //     ["wholesale", "shipping", "sponsorship", "other"],
            //     "Invalid Subject"
            // )
            // .required("Required"),  
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
                        {/* <MySelect label="Subject" name="subject" className='form-child'>
                          <option value="">Select a subject</option>
                          <option value="wholesale">Wholesale</option>
                          <option value="shipping">Shipping</option>
                          <option value="sponsorship">Sponsorship</option>
                          <option value="other">Other</option>
                        </MySelect> */}
                        <MyTextArea
                          label="Message"
                          name="message"
                          className='form-child'
                          rows='5'
                          cols='50'
                        />
                        <StyledButton type='submit' id='submit-button'>Submit</StyledButton>
                    </>
                }
            </StyledForm>
      </Formik>
    </>
  );
};


export default BasicForm
