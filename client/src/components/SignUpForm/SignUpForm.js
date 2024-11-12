import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, CircularProgress, Box } from '@mui/material';
import { Col, Row } from '../Grid';
import { validationSchema } from './validate';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';

const FormStyle = {
  background: '#fff',
  borderRadius: '15px',
  marginTop: '10px',
  padding: '20px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
};

const SignUpForm = ({ onSubmit, errorMessage = '' }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordRepeat: '',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  // Regular Sign-Up Handler
  const handleRegularSignUp = async (data) => {
    await onSubmit(data, 'default');
    reset();
  };

  // Google Sign-Up Handler
  const handleGoogleSignUp = () => {
    window.location.href = '/api/auth/google';
  };

  return (
    <form style={FormStyle} onSubmit={handleSubmit(handleRegularSignUp)}>
      <Row className="justify-content-center" spacing={2}>
        {['firstName', 'lastName', 'email', 'password', 'passwordRepeat'].map((fieldName) => (
          <Col key={fieldName} size="12 md-12 lg-6">
            <Controller
              name={fieldName}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={
                    fieldName.charAt(0).toUpperCase() +
                    fieldName.slice(1).replace('Repeat', ' Again')
                  }
                  type={fieldName.includes('password') ? 'password' : 'text'}
                  variant="outlined"
                  fullWidth
                  error={!!errors[fieldName]}
                  helperText={errors[fieldName] ? errors[fieldName].message : ''}
                />
              )}
            />
          </Col>
        ))}
      </Row>
      {errorMessage && (
        <Box mt={2}>
          <TextField
            error
            fullWidth
            helperText={errorMessage}
            value=""
            // Use a disabled TextField to display the error message
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      )}
      <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!isDirty || isSubmitting}
          startIcon={isSubmitting && <CircularProgress size={20} />}
        >
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleGoogleSignUp}
          disabled={isSubmitting}
        >
          Sign Up with Google
        </Button>
      </Box>
    </form>
  );
};

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string, // Can be undefined or null
};

export default SignUpForm;

// Incase windlow.location.href causes sercurity issues for Google OAuth flow, use:

//<Button
// component="a"
// href="/api/auth/google"
// variant="outlined"
// color="secondary"
// disabled={isSubmitting}
// >
// Sign Up with Google
// </Button>
