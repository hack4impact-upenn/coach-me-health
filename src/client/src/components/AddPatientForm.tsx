import React, {useState} from 'react';

import { Field, FieldAttributes, Form, Formik } from 'formik';
import secureAxios from "../api/core/apiClient";


const inputStyles = {
    backgroundColor: "rgb(221, 225, 231)",
    borderRadius: "15px",
    padding: "8px 20px 8px 32px",
    border: "none",
    width: "100%"
}

const fieldStyles = {
    width: "70%",
    maxWidth: "768px",
    textAlign: "center" as any,
    margin: "20px auto"
}

const iconStyles = {
    position: "absolute" as any,
    left: "14px",
    top: "10px",
    fontSize: "10px",
    color: "#637792",
}

const buttonStyles = {
    backgroundColor: "#F29DA4",
    borderRadius: "15px",
    fontWeight: 800
}

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
      <div className="field" style = {fieldStyles}>
        <p className="control has-icons-left has-icons-right">
          {children}
          <span className="is-small is-left" style = {iconStyles}>
            <i className={`fas ${icon}`}></i>
          </span>
        </p>
      </div>
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
        <div style = {{ padding: 30, backgroundColor: "white", textAlign: "center", maxWidth: 768, margin: "auto"}}>
            <h1 style = {{ fontWeight: 800, fontSize: 36, color: "#637792" }}>Add Patient</h1>
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
                        className = "add-patient-field"
                        />
                    </FieldWrapper>

                    <FieldWrapper icon="fa-info">
                        <Field
                        name="lastName"
                        style = {inputStyles}
                        type="text"
                        placeholder="Patient last name"
                        className = "add-patient-field"
                        />
                    </FieldWrapper>

                    <FieldWrapper icon="fa-globe">
                        <Field
                        name="language"
                        style = {inputStyles}
                        type="text"
                        placeholder="Patient Language"
                        className = "add-patient-field"
                        />
                    </FieldWrapper>

                    <FieldWrapper icon="fa-user-shield">
                        <Field
                        name="coach"
                        style = {inputStyles}
                        type="text"
                        placeholder="Patient Coach"
                        className = "add-patient-field"
                        />
                    </FieldWrapper>

                    <FieldWrapper icon="fa-phone">
                        <Field
                        name="phoneNumber"
                        style = {inputStyles}
                        type="tel"
                        placeholder="Patient Phone Number"
                        className = "add-patient-field"
                        />
                    </FieldWrapper>
                    <button style = {buttonStyles} className={"button is-primary" + (isLoading ? " is-loading" : "")} type="submit">
                        Add Patient
                    </button>
                    </Form>
                    
                </Formik>

        </div>
    )
}

export default AddPatientForm;