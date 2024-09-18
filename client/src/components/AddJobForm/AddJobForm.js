import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { validate, warn } from './validate';

// Define the form's style
const formStyle = {
  background: '#fff',
  borderRadius: '15px',
  boxShadow: '0px 0px 1px #5B5B5B',
  padding: '20px'
};

const AddJobForm = ({ onSubmitForm, errorMessage }) => {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
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

      // Here you would typically handle warnings separately
      // For example, you could set them as `softErrors` in the state or display them differently
      // This code snippet just showcases how you might set them up
      Object.keys(warnings).forEach(key => {
        if (!validationErrors[key]) {
          setError(key, { type: "warning", message: warnings[key] });
        }
      });

      return { values: data, errors: validationErrors || {} };
    }
  });

  const onSubmit = data => {
    onSubmitForm(data); // Call Redux action provided by the container
  }

  return (
    <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} justifyContent="center">
        {['title', 'company_name', 'url', 'location', 'post_date', 'note'].map((field, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Controller
              name={field}
              control={control}
              rules={{ required: field + ' is required' }} // Custom messages or logic can be added here
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
                  fullWidth
                  required={field === 'title' || field === 'company_name'}
                  error={!!fieldState.error}
                  helperText={fieldState.error ? fieldState.error.message : null}
                  multiline={field === 'note'}
                  rows={field === 'note' ? 2 : 1}
                  type={field === 'post_date' ? 'date' : 'text'}
                  InputLabelProps={field === 'post_date' ? { shrink: true } : undefined}
                />
              )}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography color="error">{errorMessage}</Typography>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
          >
            Track It!
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddJobForm;
