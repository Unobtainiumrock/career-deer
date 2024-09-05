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

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';
import { Col, Row } from '../Grid';
import { validate } from './validate';

const FormStyle = {
  background: '#fff',
  borderRadius: '15px',
  marginTop: '10px',
  padding: '10px',
  boxShadow: '0px 0px 1px #5B5B5B'
};

const SignUpForm = ({ errorMessage }) => {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordRepeat: ''
    },
    mode: 'onChange',
    resolver: async (data, context) => {
      return validate(data) || { values: data, errors: {} };
    }
  });

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <form style={FormStyle} onSubmit={handleSubmit(onSubmit)}>
      <Row className="justify-content-center">
        <Col size="12 md-12 lg-6">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                variant="outlined"
                fullWidth
                error={Boolean(errors.firstName)}
                helperText={errors.firstName && errors.firstName.message}
              />
            )}
          />
        </Col>
        <Col size="12 md-12 lg-6">
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name"
                variant="outlined"
                fullWidth
                error={Boolean(errors.lastName)}
                helperText={errors.lastName && errors.lastName.message}
              />
            )}
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col size="12 md-12">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
                error={Boolean(errors.email)}
                helperText={errors.email && errors.email.message}
              />
            )}
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col size="12 md-12">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                error={Boolean(errors.password)}
                helperText={errors.password && errors.password.message}
              />
            )}
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col size="12 md-12">
          <Controller
            name="passwordRepeat"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Enter your password again"
                variant="outlined"
                fullWidth
                error={Boolean(errors.passwordRepeat)}
                helperText={errors.passwordRepeat && errors.passwordRepeat.message}
              />
            )}
          />
        </Col>
      </Row>
      <Row className="justify-content-end">
        <Col size="12">
          <h6>{errorMessage}</h6>
        </Col>
      </Row>
      <Row className="justify-content-end">
        <Col size="12 lg-6">
        </Col>
        <Col size="10 md-10 lg-6" className="text-right">
          <Button variant="contained" color="primary" className="btn btn-info" type="submit" disabled={isSubmitting}>
            Sign Up
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default SignUpForm;
