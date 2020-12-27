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
const initialValues = {
    messageTxt: "",
    language: "",
    type: "",
}

const ColoredLine = (
    <hr  style={{
        color: '#637792',
        backgroundColor: '#000000',
        height: .5,
        borderColor : '#000000'
    }}/>
);


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

  const FieldWrapperSelect = ({
    children,
  }: {
    children: FieldAttributes<any>;
  }) => {
    return (
      <StyledField className="field">
          <p className="control">
              {children}
          </p>
      </StyledField>
    );
};

const MessageTemplateForm : React.FC = () => {

    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [isError, setError] = useState(false);
    
    const handleSubmit = (data : any) => {
        setLoading(true);
        secureAxios.post("/api/messageTemplate/newTemplate", data).then( (res) => {
            setMessage(`Message template added successfully`)
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
            <h1 style = {{ fontWeight: 800, fontSize: 36, color: "#637792" }}>Add Message Template</h1>
            <p>Please enter the message information below: </p>
            { message != null && 
                <p style = {{color: isError ? "red" : "#637792"}}>{ message }</p>
            }
          

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                    <FieldWrapperSelect>
                        <p>Select language: </p>
                        <Field as="select" name="language">
                            <option value="Spanish">Spanish</option>
                            <option value="English">English</option>
                        </Field>
                    </FieldWrapperSelect>

                    <FieldWrapperSelect>
                        <p>Select message type: </p>
                        <Field as="select" name="color">
                            <option value="green">Green</option>
                            <option value="yellow">Yellow</option>
                            <option value="red">Red</option>
                         </Field>
                    </FieldWrapperSelect>

                    <FieldWrapper icon="fa-info">
                        <Field 
                        name="message text"
                        style = {inputStyles}
                        type="text"
                        placeholder="Message text"
                        className = "form-field"
                        />
                    </FieldWrapper>

                    <Button className={"button is-primary" + (isLoading ? " is-loading" : "")} type="submit">
                        Add Message
                    </Button>
                    </Form>
                    
                </Formik>

        </div>
    )
}

export default MessageTemplateForm;