import React from 'react';
import styled from 'styled-components';
import { Field, Form, Formik } from 'formik';

interface SendBarProps {
    onSend: () => void
    placeholder: string
}

const TextSendField = styled.div`
    width: 100%;
    text-align: center;
`

const inputStyles = {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: "12px",
    padding: "8px 20px 8px 32px",
    border: "none",
    width: "100%",
    boxShadow: "5px 5px 10px 0px rgba(221, 225, 231, 0.5)"

}

const SearchBar: React.FC<SendBarProps> = ({ onSend, placeholder }) => {
    const onSubmit = (values : any) => {
        onSend();
    }

    return (
        <Formik initialValues={{ query: "" }} onSubmit = { onSubmit }>
            <Form>
                <TextSendField>
                    <p className="control">
                        <Field
                            name="query"
                            style={inputStyles}
                            type="text"
                            placeholder={placeholder}
                            className="form-field"
                        />
                    </p>
                </TextSendField>
            </Form>
        </Formik>
    )
}

export default TextSendBar;