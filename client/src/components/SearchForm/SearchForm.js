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

const SearchForm = ({ onSubmitForm, errorMessage }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      keywords: '',
      location: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    onSubmitForm(data); // Trigger Redux action through container.
  };

  return (
    <Col size="12 col-md-12 lg-5">
      <h2 className="text-center mt-5 pt-4 montserrat font-weight-bold">
        Time to start the hunt!
      </h2>
      <h6 className="text-center">
        Let's hunt for some jobs! Add jobs to your progress tracker
      </h6>
      <form style={FormStyle} onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Controller
            name="keywords"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="What are you hunting for?"
                variant="outlined"
                fullWidth
                error={Boolean(errors.keywords)}
                helperText={errors.keywords && errors.keywords.message}
              />
            )}
          />
        </Row>
        <Row>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Where shall we look?"
                variant="outlined"
                fullWidth
                error={Boolean(errors.location)}
                helperText={errors.location && errors.location.message}
              />
            )}
          />
        </Row>
        <h6>{errorMessage}</h6>
        <Row className="justify-content-end">
          <Button
            variant="contained"
            color="primary"
            className="my-3"
            type="submit"
            disabled={isSubmitting}
          >
            Search <i className="fas fa-bullseye"></i>
          </Button>
        </Row>
      </form>
    </Col>
  );
};

export default SearchForm;
