import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import isEmail from 'validator/lib/isEmail'
import Input from './Inputs'
import Button from '../shared/Button'
import Loading from '../shared/LoadingIndicator'


const Form = styled.form`
    max-width: 250px;
`

const Label = styled.label`
    display: block;
    margin: 20px 0;
`

const SubmitError = styled.div`
    color: red;
    margin: 20px 0;
`

export default function EmailSubscriberForm({ reset }) {

    console.log('reset', reset)

    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)
    const [submitError, setSubmitError] = useState(null)
    const [submitting, setSubmitting] = useState(null)
    const [submitted, setSubmitted] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isEmail(email)) {
            setError('* Must be a valid email')
            return
        }

        setSubmitting(true)
        try {
            const res = await fetch('/.netlify/functions/submit-email-subscriber', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(email)
            })

            console.log('client res for new email sub', res)

            if (!res.ok) {
                throw new Error('an error adding contact')
            }

            setSubmitted(true)
            setSubmitError(false)

        } catch (err) {
            setSubmitError(true)
        } finally {
            setSubmitting(false)
        }

    }


    useEffect(() => {
        if (reset) {
            setSubmitted(false)
        }
    }, [reset])


    return (
        <Form onSubmit={handleSubmit}>
            {/* <strong>Newsletter</strong> */}
            <Label htmlFor='email'>
                {submitError ? (
                    <SubmitError>
                        There was an error, please try again
                    </SubmitError>
                ) : (
                    <i>
                        Sign up to receive emails about our
                        our latest products and events
                    </i>
                )}
            </Label>
            {submitting ? (
                <Loading />
            ) : (
                <>
                    {submitted ? (
                        <div>
                            Thank you for signing up!
                        </div>
                    ) : (
                        <>
                            <Input
                                name='email'
                                id='email'
                                placeholder='email'
                                value={email}
                                error={error}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button>Subscribe</Button>
                        </>
                    )}
                </>
            )}
        </Form>
    )
}