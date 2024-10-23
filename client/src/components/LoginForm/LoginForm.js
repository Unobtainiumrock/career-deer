// import React from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { TextField, Button, Box, Typography } from '@mui/material';
// import { validate } from './validate';


// const FormStyle = {
//   background: '#fff',
//   borderRadius: '15px',
//   padding: '15px',
//   boxShadow: '0px 0px 1px #5B5B5B'
// }

// // const LoginForm = ({ dispatch }) => {
// //   const { control, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
// //     defaultValues: {
// //       email: '',
// //       password: ''
// //     },
// //     mode: 'onChange'
// //   });

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

// let LoginForm = ({ handleSubmit, pristine, submitting, errorMessage, auth }) => {
//   return (
//     <form style={FormStyle} className="text-center" onSubmit={handleSubmit}>
//       <div>
//         <Field className="text-input" name="email" component={renderTextField} type="email" label="Email" />
//       </div>
//       <div>
//         <Field className="text-input" name="password" component={renderTextField} type="password" label="Password" />
//       </div>
//       <div className="mt-3">
//         <h6>{errorMessage}</h6>
//         <div className="text-right">
//         <Button variant="contained" color="primary" className="roboto login-btn btn" type="submit" disabled={pristine || submitting}>
//           Login &nbsp; <i className="fas fa-sign-in-alt"></i>
//         </Button>&nbsp;&nbsp;
//         {/* <Button onClick={auth} className="roboto login-btn btn btn-light"> */}
//         Login with <img className="ml-1" height="20px" src="/imgs/icons/google-logo.svg" alt="google logo"/>
//         {/* </Button> */}
//         </div>
//       </div>
//     </form>
//   )
// };

// LoginForm = reduxForm({
//   // a unique name for the form
//   form: 'login',
//   validate,
//   // clears the form after submission
//   onSubmitSuccess: (result, dispatch) => dispatch(reset('login'))
// })(LoginForm);

// // Inside this file, we wrapped our component inside the imported 'reduxForm' function
// // We can think of reduxForm(), from redux-form, behaving similar to connect() from react-redux in
// // terms of connecting a component to communicate with the store 
// export default LoginForm;

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField'; // Ensure you're using @mui/material
import Button from '@mui/material/Button';
import { FormHelperText } from '@mui/material';

const FormStyle = {
  // Define your form styles here or import them if defined elsewhere
};

const LoginForm = ({ onSubmit, errorMessage, auth }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm();

  const onSubmitForm = (data) => {
    // Call the onSubmit prop passed from the parent component
    onSubmit(data);
    // Reset the form after submission
    reset();
  };

  return (
    <form style={FormStyle} className="text-center" onSubmit={handleSubmit(onSubmitForm)}>
      <div>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: 'Email is not valid',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              className="text-input"
              label="Email"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
              fullWidth
              margin="normal"
            />
          )}
        />
      </div>
      <div>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: 'Password is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              className="text-input"
              label="Password"
              type="password"
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
              fullWidth
              margin="normal"
            />
          )}
        />
      </div>
      <div className="mt-3">
        {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
        <div className="text-right">
          <Button
            variant="contained"
            color="primary"
            className="roboto login-btn btn"
            type="submit"
            disabled={!isDirty || isSubmitting}
          >
            Login &nbsp; <i className="fas fa-sign-in-alt"></i>
          </Button>
          &nbsp;&nbsp;
          {/* If you have a function to handle Google login, uncomment the button below */}
          {/* 
          <Button onClick={auth} className="roboto login-btn btn btn-light">
            Login with <img className="ml-1" height="20px" src="/imgs/icons/google-logo.svg" alt="google logo" />
          </Button>
          */}
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
