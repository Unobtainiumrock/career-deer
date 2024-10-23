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

// let UpdatePWForm = ({ handleSubmit, pristine, submitting, errorMessage }) => {
//   return (
//     <Row className="justify-content-center text-center">
//       <Col size="12 md-10">

//         <form style={FormStyle} onSubmit={handleSubmit}>

//           <Row>
//           <h2 className="text-left mt-4 montserrat">Enter a new password.</h2>
//             <Field className="text-input" name="password" component={renderTextField} type="password" label="Please enter a new password." />
//             <Field className="text-input" name="passwordRepeat" component={renderTextField} type="password" label="Please confirm your new password" />
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
//             Update Password
//             </Button>
//             </Row>
//         </form>
//        </Col>
//      </Row>
//   );
// };

// UpdatePWForm = reduxForm({
//   form: 'updatePW',
//   validate
// })(UpdatePWForm);


// export default UpdatePWForm;

// import React from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { TextField, Button } from '@material-ui/core';
// import { Col, Row } from '../Grid';

// const FormStyle = {
//   background: '#fff',
//   borderRadius: '15px',
//   paddingLeft: '50px',
//   paddingRight: '50px',
//   boxShadow: '0px 0px 1px #5B5B5B'
// };

// const UpdatePWForm = ({ errorMessage }) => {
//   const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
//     mode: 'onTouched',
//     defaultValues: {
//       password: '',
//       passwordRepeat: ''
//     }
//   });

//   const onSubmit = data => {
//     console.log(data);
//     // Add your password update logic here
//   };

//   return (
//     <Row className="justify-content-center text-center">
//       <Col size="12 md-10">
//         <form style={FormStyle} onSubmit={handleSubmit(onSubmit)}>
//           <Row>
//             <h2 className="text-left mt-4 montserrat">Enter a new password.</h2>
//             <Controller
//               name="password"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Please enter a new password."
//                   type="password"
//                   variant="outlined"
//                   fullWidth
//                   error={Boolean(errors.password)}
//                   helperText={errors.password && errors.password.message}
//                 />
//               )}
//             />
//             <Controller
//               name="passwordRepeat"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Please confirm your new password"
//                   type="password"
//                   variant="outlined"
//                   fullWidth
//                   error={Boolean(errors.passwordRepeat)}
//                   helperText={errors.passwordRepeat && errors.passwordRepeat.message}
//                 />
//               )}
//             />
//           </Row>
//           <h6>{errorMessage}</h6>
//           <Row className="justify-content-end">
//             <Button
//               variant="contained"
//               color="secondary"
//               className="my-3"
//               type="submit"
//               disabled={isSubmitting}
//             >
//               Update Password
//             </Button>
//           </Row>
//         </form>
//       </Col>
//     </Row>
//   );
// };

// export default UpdatePWForm;

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material'; // Updated import
import { Col, Row } from '../Grid';

const FormStyle = {
  background: '#fff',
  borderRadius: '15px',
  paddingLeft: '50px',
  paddingRight: '50px',
  boxShadow: '0px 0px 1px #5B5B5B',
};

const UpdatePWForm = ({ errorMessage }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      password: '',
      passwordRepeat: '',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // Add your password update logic here
  };

  return (
    <Row className="justify-content-center text-center">
      <Col size="12 md-10">
        <form style={FormStyle} onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <h2 className="text-left mt-4 montserrat">Enter a new password.</h2>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Please enter a new password."
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                />
              )}
            />
            <Controller
              name="passwordRepeat"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Please confirm your new password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.passwordRepeat)}
                  helperText={errors.passwordRepeat?.message}
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
              Update Password
            </Button>
          </Row>
        </form>
      </Col>
    </Row>
  );
};

export default UpdatePWForm;
