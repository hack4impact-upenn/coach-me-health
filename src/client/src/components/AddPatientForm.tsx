import React, {useState} from 'react';

import { Field, FieldAttributes, Form, Formik } from 'formik';
import secureAxios from "../api/core/apiClient";


const inputStyles = {
    backgroundColor: "rgb(221, 225, 231)",
    borderRadius: "15px",
    padding: "8px 20px 8px 28px",
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
    patientName: "",
    patientLang: "",
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

    const handleSubmit = (data : any) => {
        secureAxios.post("/api/patients/add", data).then( (data) => {
            console.log("success");
        }).catch( (err) => {
            console.log("rip")
        })
    }

    return (
        <div style = {{ padding: 30, backgroundColor: "white", textAlign: "center", maxWidth: 768}}>
            <h1 style = {{ fontWeight: 800, fontSize: 36, color: "#637792" }}>Add Patient</h1>
            <p>Please enter patient information below</p>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                    <FieldWrapper icon="fa-info">
                        <Field
                        name="patientName"
                        style = {inputStyles}
                        type="text"
                        placeholder="Patient name"
                        />
                    </FieldWrapper>
                    <FieldWrapper icon="fa-globe">
                        <Field
                        name="patientLang"
                        style = {inputStyles}
                        type="text"
                        placeholder="Patient Language"
                        />
                    </FieldWrapper>
                    <FieldWrapper icon="fa-phone">
                        <Field
                        name="phoneNumber"
                        style = {inputStyles}
                        type="tel"
                        placeholder="Patient Phone Number"
                        />
                    </FieldWrapper>
                    <button style = {buttonStyles} className="button is-primary" type="submit">
                        Sign in
                    </button>
                    </Form>
                </Formik>

        </div>
    )
}

export default AddPatientForm;