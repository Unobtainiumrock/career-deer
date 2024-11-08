import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Box,
  Stack
} from '@mui/material';
import { validate, warn } from './validate';

// Define the form's style
const formStyle = {
  background: '#fff',
  borderRadius: '15px',
  boxShadow: '0px 0px 10px #5B5B5B',
  padding: '20px',
  maxWidth: '600px',
  margin: '0 auto'
};

const AddJobForm = ({ onSubmitForm, errorMessage, isLoading }) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      title: '',
      company_name: '',
      url: '',
      location: '',
      post_date: '',
      note: ''
    },
    mode: 'onTouched',
    resolver: async (data) => {
      const validationErrors = validate(data);
      const warnings = warn(data);

      // Handle warnings by setting them as soft errors
      Object.keys(warnings).forEach((key) => {
        if (!validationErrors[key]) {
          setError(key, { type: 'warning', message: warnings[key] });
        }
      });

      return { values: data, errors: validationErrors || {} };
    }
  });

  const onSubmit = (data) => {
    onSubmitForm(data); // Call Redux action provided by the container
  };

  return (
    <Box component="form" sx={formStyle} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {/* Form Fields */}
        {['title', 'company_name', 'url', 'location', 'post_date', 'note'].map(
          (field) => (
            <Controller
              key={field}
              name={field}
              control={control}
              rules={{ required: `${field.replace('_', ' ')} is required` }}
              render={({ field: controllerField, fieldState }) => (
                <TextField
                  {...controllerField}
                  label={
                    field.charAt(0).toUpperCase() +
                    field.slice(1).replace('_', ' ')
                  }
                  fullWidth
                  required={field === 'title' || field === 'company_name'}
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error ? fieldState.error.message : null
                  }
                  multiline={field === 'note'}
                  rows={field === 'note' ? 4 : 1}
                  type={field === 'post_date' ? 'date' : 'text'}
                  InputLabelProps={
                    field === 'post_date' ? { shrink: true } : undefined
                  }
                />
              )}
            />
          )
        )}

        {/* Error Message */}
        {errorMessage && (
          <Typography color="error" align="center">
            {errorMessage}
          </Typography>
        )}

        {/* Submit Button */}
        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting || isLoading}
            startIcon={
              isLoading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {isLoading ? 'Submitting...' : 'Track It!'}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default AddJobForm;
