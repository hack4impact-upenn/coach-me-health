import React, {useState} from 'react';

import { Field, FieldAttributes, Form, Formik } from 'formik';
import secureAxios from "../api/core/apiClient";

import styled from 'styled-components';

const inputStyles = {
    backgroundColor: "rgb(221, 225, 231)",
    borderRadius: "15px",
    padding: "8px 20px 8px 32px",
    border: "none",
    width: "100%"
}

const StyledField = styled.div`
    width: 70%;
    max-width: 768px;
    text-align: center;
    margin: 20px auto
`

const Icon = styled.span`
    position: absolute;
    left: 14px;
    top: 10px;
    font-size: 10px;
    color: #637792;
`

const Button = styled.button`
    background-color: #F29DA4 !important;
    border-radius: 15px !important;
    font-weight: 800 !important;
    &:focus {
        box-shadow: none !important;
    }
`

const FormContainer = styled.div`
    box-shadow: 5px 5px 10px rgba(221,225,231,0.5);
    padding: 30px;
    background-color: white;
    text-align: center;
    max-width: 768px;
    margin: auto;
    border-radius: 20px;
`

const AddPatientHeader = styled.h1`
    font-weight: 800;
    font-size: 36px;
    color: #637792;
`


const initialValues = {
    firstName: "",
    lastName: "",
    language: "",
    coach: "",
    phoneNumber: ""
}

const FieldWrapper = ({
    children,
    icon,
  }: {
    children: FieldAttributes<any>;
    icon?: string;
  }) => {
    if (!icon) return children;
  
    return (
      <StyledField className="field">
        <p className="control has-icons-left has-icons-right">
          {children}
          <Icon className="is-small is-left">
            <i className={`fas ${icon}`}></i>
          </Icon>
        </p>
      </StyledField>
    );
  };

const AddPatientForm : React.FC = () => {

    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [isError, setError] = useState(false);

    const handleSubmit = (data : any) => {
        setLoading(true);
        secureAxios.post("/api/patients/add", data).then( (res) => {
            setMessage(`Patient ${data.firstName} ${data.lastName} added successfully`)
            setError(false);
            setLoading(false);
        }).catch( (err) => {
            setMessage(err.response.data.msg)
            setLoading(false)
            setError(true);
        })
    }

    return (
        <FormContainer>
            <AddPatientHeader>Add Patient</AddPatientHeader>
            <p>Please enter patient information below</p>
            { message != null && 
                <p style = {{color: isError ? "red" : "#637792"}}>{ message }</p>
            }

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                    <FieldWrapper icon="fa-info">
                        <Field
                        name="firstName"
                        style = {inputStyles}
                        type="text"
                        placeholder="Patient first name"
                        className = "form-field"
                        />
                    </FieldWrapper>

                    <FieldWrapper icon="fa-info">
                        <Field
                        name="lastName"
                        style = {inputStyles}
                        type="text"
                        placeholder="Patient last name"
                        className = "form-field"
                        />
                    </FieldWrapper>

                    <FieldWrapper icon="fa-globe">
                        <Field
                        name="language"
                        style = {inputStyles}
                        type="text"
                        placeholder="Patient Language"
                        className = "form-field"
                        />
                    </FieldWrapper>

                    <FieldWrapper icon="fa-user-shield">
                        <Field
                        name="coach"
                        style = {inputStyles}
                        type="text"
                        placeholder="Patient Coach"
                        className = "form-field"
                        />
                    </FieldWrapper>

                    <FieldWrapper icon="fa-phone">
                        <Field
                        name="phoneNumber"
                        style = {inputStyles}
                        type="tel"
                        placeholder="Patient Phone Number"
                        className = "form-field"
                        />
                    </FieldWrapper>
                    <Button className={"button is-primary" + (isLoading ? " is-loading" : "")} type="submit">
                        Add Patient
                    </Button>
                    </Form>
                    
                </Formik>
        </FormContainer>
    )
}

export default AddPatientForm;