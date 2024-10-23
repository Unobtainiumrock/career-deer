// import React from 'react';
// import { Field, reduxForm } from 'redux-form';
// import { TextField } from 'redux-form-material-ui';
// import { Col, Row } from '../Grid';
// import { validate } from './validate';
// import Button from '@material-ui/core/Button';

// const FormStyle = {
//   background: '#fff',
//   borderRadius: '15px',
//   marginTop: '10px',
//   padding: '10px',
//   boxShadow: '0px 0px 1px #5B5B5B'
// }

// const renderTextField = ({
//   input,
//   label,
//   meta: { touched, error },
//   ...custom
// }) => (
//     <TextField
//       hintText={label}
//       floatingLabelText={label}
//       errorText={touched && error && <span>{error}</span>}
//       {...input}
//       {...custom}
//     />
//   )

// let SignUpForm = (props) => {
// const { handleSubmit, pristine, submitting, errorMessage, /*googleAuth*/ } = props;
//   return (
//     <form style={FormStyle} onSubmit={handleSubmit}>
//       <Row className="justify-content-center">
//         <Col size="12 md-12 lg-6">
//           <Field className="text-input" name="firstName" component={renderTextField} type="text" label="First Name"></Field>
//         </Col>
//         <Col size="12 md-12 lg-6">
//           <Field className="text-input" name="lastName" component={renderTextField} type="text" label="Last Name"></Field>
//         </Col>
//       </Row>
//       <Row className="justify-content-center">
//         <Col size="12 md-12">
//           <Field className="text-input" name="email" component={renderTextField} type="email" label="Email"></Field>
//         </Col>
//       </Row>
//       <Row className="justify-content-center">
//         <Col size="12 md-12">
//           <Field className="text-input" name="password" component={renderTextField} type="password" label="Password"></Field>
//         </Col>
//       </Row>
//       <Row className="justify-content-center">
//         <Col size="12 md-12">
//           <Field className="text-input" name="passwordRepeat" component={renderTextField} type="password" label="Enter your password again"></Field>
//         </Col>
//       </Row>
//       <Row className="justify-content-end">
//         <Col size="12">
//         <h6>{errorMessage}</h6>
//         </Col>
//       </Row>
//       <Row className="justify-content-end">
//         <Col size="12 lg-6">
//         </Col>
//         <Col size="10 md-10 lg-6" className="text-right">
//           <Button variant="contained" color="primary" className="btn btn-info" type="submit" disabled={pristine || submitting}>
//             Sign Up
//           </Button> &nbsp;&nbsp;
//           {/* <Button onClick={googleAuth} className="roboto login-btn btn btn-light">
//           Sign Up with&nbsp; <img className="ml-1" height="20px" src="/imgs/icons/google-logo.svg" alt="google logo"/>
//           </Button> */}
//         </Col>
//       </Row>

//     </form>
//   );
// };

// SignUpForm = reduxForm({
//   // a unique name for the form
//   form: 'signup',
//   validate
//   // We don't want the form to clear on submission because if there's an error, 
//   // we want the user to be able to edit what they already entered
// })(SignUpForm);

// export default SignUpForm

// import React from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { TextField, Button } from '@material-ui/core';
// import { Col, Row } from '../Grid';
// import { validate } from './validate';

// const FormStyle = {
//   background: '#fff',
//   borderRadius: '15px',
//   marginTop: '10px',
//   padding: '10px',
//   boxShadow: '0px 0px 1px #5B5B5B'
// };

// const SignUpForm = ({ onSubmit, errorMessage }) => {
//   const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
//     defaultValues: {
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: '',
//       passwordRepeat: ''
//     },
//     mode: 'onChange',
//     resolver: async (data, context) => {
//       return validate(data) || { values: data, errors: {} };
//     }
//   });

//   const onSubmitForm = (data, event) => {
//     const isGoogleSignUp = event.target.name === 'googleSignUp';
//     onSubmit(data, isGoogleSignUp ? 'google' : 'default');
//   };

//   return (
//     <form style={FormStyle} onSubmit={handleSubmit(onSubmitForm)}>
//       <Row className="justify-content-center">
//         {['firstName', 'lastName', 'email', 'password', 'passwordRepeat'].map(field => (
//           <Col key={field} size="12 md-12 lg-6">
//             <Controller
//               name={field}
//               control={control}
//               rules={{ required: `${field} is required` }} // Basic validation
//               render={({ field, fieldState: { error } }) => (
//                 <TextField
//                   {...field}
//                   label={field.charAt(0).toUpperCase() + field.slice(1).replace('Repeat', ' Again')}
//                   type={field.includes('password') ? 'password' : 'text'}
//                   variant="outlined"
//                   fullWidth
//                   error={!!error}
//                   helperText={error ? error.message : null}
//                 />
//               )}
//             />
//           </Col>
//         ))}
//       </Row>
//       <Row className="justify-content-end">
//         <Col size="12">
//           <h6>{errorMessage}</h6>
//         </Col>
//       </Row>
//       <Row className="justify-content-end">
//         <Col size="12 lg-6">
//         </Col>
//         <Col size="10 md-10 lg-6" className="text-right">
//           <Button variant="contained" color="primary" className="btn btn-info" type="submit" disabled={isSubmitting}>
//             Sign Up
//           </Button>
//           <Button variant="contained" color="secondary" className="ml-2" name="googleSignUp" onClick={handleSubmit(onSubmitForm)} disabled={isSubmitting}>
//             Sign Up with Google
//           </Button>
//         </Col>
//       </Row>
//     </form>
//   )
// };

// export default SignUpForm;

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material'; // Updated import
import { Col, Row } from '../Grid';
import { validate } from './validate';

const FormStyle = {
  background: '#fff',
  borderRadius: '15px',
  marginTop: '10px',
  padding: '10px',
  boxShadow: '0px 0px 1px #5B5B5B',
};

const SignUpForm = ({ onSubmit, errorMessage }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordRepeat: '',
    },
    mode: 'onChange',
    resolver: async (data) => {
      return validate(data) || { values: data, errors: {} };
    },
  });

  const onSubmitForm = (data, event) => {
    const isGoogleSignUp = event.target.name === 'googleSignUp';
    onSubmit(data, isGoogleSignUp ? 'google' : 'default');
  };

  return (
    <form style={FormStyle} onSubmit={handleSubmit(onSubmitForm)}>
      <Row className="justify-content-center">
        {['firstName', 'lastName', 'email', 'password', 'passwordRepeat'].map((fieldName) => (
          <Col key={fieldName} size="12 md-12 lg-6">
            <Controller
              name={fieldName}
              control={control}
              rules={{ required: `${fieldName} is required` }} // Basic validation
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label={
                    fieldName.charAt(0).toUpperCase() +
                    fieldName.slice(1).replace('Repeat', ' Again')
                  }
                  type={fieldName.includes('password') ? 'password' : 'text'}
                  variant="outlined"
                  fullWidth
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
          </Col>
        ))}
      </Row>
      <Row className="justify-content-end">
        <Col size="12">
          <h6>{errorMessage}</h6>
        </Col>
      </Row>
      <Row className="justify-content-end">
        <Col size="12 lg-6"></Col>
        <Col size="10 md-10 lg-6" className="text-right">
          <Button
            variant="contained"
            color="primary"
            className="btn btn-info"
            type="submit"
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="ml-2"
            name="googleSignUp"
            onClick={handleSubmit(onSubmitForm)}
            disabled={isSubmitting}
          >
            Sign Up with Google
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default SignUpForm;
