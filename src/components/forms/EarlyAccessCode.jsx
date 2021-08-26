import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import isEmail from 'validator/lib/isEmail'
import Input from './Inputs'
import Button from 'components/shared/Button'
import Loading from 'components/shared/LoadingIndicator'


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

export default function SingleInputForm({ reset, setEarlyAccess }) {

    // console.log('reset', reset)

    const [state, setState] = useState('')
    const [error, setError] = useState(null)
    const [submitError, setSubmitError] = useState(null)
    const [submitting, setSubmitting] = useState(null)
    const [submitted, setSubmitted] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        setSubmitting(true)
        try {
            const res = await fetch('/api/verify-early-access-code', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ accessCode: state })
            })

            console.log('client res for new state sub', res)

            if (!res.ok) {
                throw new Error('an error adding contact')
            }

            if (typeof window !== 'undefined') {
                localStorage.setItem('earlyAccess', 'true')
            }
            setEarlyAccess(true)
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
            <Label htmlFor='state'>
                {submitError ? (
                    <SubmitError>
                        Wrong Code.......Try again
                    </SubmitError>
                ) : (
                    <i>
                        Enter Early Access Code
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
                                name='earlyAccessCode'
                                id='earlyAccessCode'
                                placeholder='earlyAccessCode'
                                value={state}
                                error={error}
                                onChange={(e) => setState(e.target.value)}
                            />
                            <Button style={{ marginTop: '15px' }}>Submit</Button>
                        </>
                    )}
                </>
            )}
        </Form>
    )
}