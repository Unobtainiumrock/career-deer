// import React from 'react';

// import { Field, reduxForm } from 'redux-form';
// import { TextField } from 'redux-form-material-ui';
// import { Col, Row } from '../Grid';
// import { validate } from './validate';
// import Button from '@material-ui/core/Button';

// const renderTextField = (
//   {
//     input,
//     label,
//     meta: { touched, error },
//     ...custom
//   }) => (
//     <TextField
//       hintText={label}
//       floatingLabelText={label}
//       errorText={touched && error && <span>{error}</span>}
//       {...input}
//       {...custom}
//     />
//   );

// const FormStyle = {
//   background: '#fff',
//   borderRadius: '15px',
//   paddingLeft: '50px',
//   paddingRight: '50px',
//   boxShadow: '0px 0px 1px #5B5B5B'
// };

// let ResetPWForm = ({ handleSubmit, pristine, submitting, errorMessage }) => {
//   return (
//     <Row className="justify-content-center text-center">
//       <Col size="12 md-8">

//         <form style={FormStyle} onSubmit={handleSubmit}>
//           <Row>
//           <h2 className="text-left mt-4 montserrat">Reset Your Password</h2>
//             <Field className="text-input" name="email" component={renderTextField} type="email" label="Please enter your email." />
//           </Row>
//           <h6>{errorMessage}</h6>
//           <Row className="justify-content-end">
//           <Button
//             variant="contained"
//             color="secondary"
//             className = "my-3"
//             type="submit"
//             disabled={pristine || submitting}
//           >
//           Send Reset Link
//             </Button>
//           </Row>
//         </form>
//        </Col>
//      </Row>
//   );
// };

// ResetPWForm = reduxForm({
//   form: 'requestPWReset',
//   validate
// })(ResetPWForm);


// export default ResetPWForm;

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';
import { Col, Row } from '../Grid';
import { validate } from './validate';

const FormStyle = {
  background: '#fff',
  borderRadius: '15px',
  paddingLeft: '50px',
  paddingRight: '50px',
  boxShadow: '0px 0px 1px #5B5B5B'
};

const ResetPWForm = ({ onSubmitForm, errorMessage }) => {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      email: ''
    },
    mode: 'onChange',
    resolver: async (data) => {
      const validationErrors = validate(data);  // Assume validate returns an object in { [fieldName]: errorMessage }
      return { values: data, errors: validationErrors || {} };
    }
  });

  const onSubmit = data => {
    onSubmitForm(data);  // Call the Redux action provided by the container
  };

  return (
    <Row className="justify-content-center text-center">
      <Col size="12 md-8">
        <form style={FormStyle} onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <h2 className="text-left mt-4 montserrat">Reset Your Password</h2>
            <Controller
              name="email"
              control={control}
              rules={{ required: 'Email is required' }}  // Example of inline validation
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  className="text-input"
                  type="email"
                  label="Please enter your email."
                  error={!!error}
                  helperText={error ? error.message : null}
                  fullWidth
                />
              )}
            />
          </Row>
          <h6>{errorMessage}</h6>
          <Row className="justify-content-end">
            <Button
              variant="contained"
              color="secondary"
              className="my-3"
              type="submit"
              disabled={isSubmitting}
            >
              Send Reset Link
            </Button>
          </Row>
        </form>
      </Col>
    </Row>
  );
};

export default ResetPWForm;
