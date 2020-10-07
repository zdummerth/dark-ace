import React, { useState } from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import styled from "styled-components";




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
  font-weight: bold;
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


const BasicForm = () => {
    const [ submitted, setSubmitted ] = useState(false)
    const [ isSubmitting, setIsSubmitting ] = useState(false)


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

            if(response.ok) {
                // form successfully submitted
                setSubmitted(true)
                setIsSubmitting(false)
            }
            
        } catch(err) {
            console.log({err})
            alert('Error')
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
                {isSubmitting ? <p>Submitting...</p> : submitted ? 
                    <p>Thank you for your message</p> 
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
                        <button type="submit">Submit</button>
                    </>
                }
            </StyledForm>
      </Formik>
    </>
  );
};


export default BasicForm
