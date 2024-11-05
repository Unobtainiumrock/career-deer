import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, CircularProgress, Box, FormHelperText } from '@mui/material';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidationSchema } from './validate';
const FormStyle = {
  background: '#fff',
  borderRadius: '15px',
  marginTop: '10px',
  padding: '20px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
};

const LoginForm = ({ onSubmit, errorMessage }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
    reset
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange',
    resolver: yupResolver(loginValidationSchema)
  });

  const onSubmitForm = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form style={FormStyle} onSubmit={handleSubmit(onSubmitForm)}>
      <Box mb={2}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />
          )}
        />
      </Box>
      <Box mb={2}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
            />
          )}
        />
      </Box>
      {errorMessage && (
        <Box mb={2}>
          <FormHelperText error>{errorMessage}</FormHelperText>
        </Box>
      )}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!isDirty || isSubmitting}
          startIcon={isSubmitting && <CircularProgress size={20} />}
        >
          {isSubmitting ? 'Logging In...' : 'Login'}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => window.location.href = '/api/auth/google'}
          disabled={isSubmitting}
        >
          Login with Google
        </Button>
      </Box>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

LoginForm.defaultProps = {
  errorMessage: ''
};

export default LoginForm;
