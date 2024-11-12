import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { TextField, IconButton, Tooltip, Paper } from '@mui/material'; // Updated import
import { Col, Row } from '../Grid';
import { validate } from './validate';
import './UpdateJobForm.css';

const FormStyle = {
  background: '#fff',
  borderRadius: '15px',
  marginTop: '10px',
  padding: '10px',
  boxShadow: '0px 0px 1px #5B5B5B',
};

const UpdateJobForm = ({ onSubmit, deleteJob, errorMessage, initialValues }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialValues || {
      title: '',
      company_name: '',
      location: '',
      url: '',
      post_date: '',
      notes: [{ content: '' }],
    },
    mode: 'onChange',
    resolver: async (data) => {
      return validate(data) || { values: data, errors: {} };
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'notes',
  });

  const onSubmitForm = (data) => {
    onSubmit(data); // May need more custom functionality like SignUp did.
  };

  return (
    <form style={FormStyle} onSubmit={handleSubmit(onSubmitForm)}>
      <Row className="justify-content-center">
        <Col size="12 md-12 lg-6">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Job Title"
                variant="outlined"
                fullWidth
                error={Boolean(errors.title)}
                helperText={errors.title && errors.title.message}
                required
              />
            )}
          />
        </Col>
        <Col size="12 md-12 lg-6">
          <Controller
            name="company_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Company"
                variant="outlined"
                fullWidth
                error={Boolean(errors.company_name)}
                helperText={errors.company_name && errors.company_name.message}
                required
              />
            )}
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        {fields.map((item, index) => (
          <Row key={item.id}>
            <Col size="12 md-12 lg-6">
              <Paper style={{ padding: '10px', marginBottom: '10px' }}>
                <Controller
                  name={`notes.${index}.content`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={`Note #${index + 1}`}
                      multiline
                      minRows={2}
                      maxRows={4}
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <Tooltip title="Delete Note" placement="top">
                  <IconButton onClick={() => remove(index)}>
                    <i className="fas fa-times"></i>
                  </IconButton>
                </Tooltip>
              </Paper>
            </Col>
          </Row>
        ))}
        <Tooltip title="Add A Note" placement="top">
          <IconButton onClick={() => append({ content: '' })}>
            <i className="fas fa-plus"></i>
          </IconButton>
        </Tooltip>
      </Row>
      <Row className="justify-content-end">
        <Col size="12">
          <h6>{errorMessage}</h6>
        </Col>
        <Col size="10 md-10 lg-6" className="text-right">
          <Tooltip title="Save changes" placement="left">
            <IconButton
              type="submit"
              disabled={isSubmitting}
              className="save-btn"
            >
              <i className="fas fa-save"></i>
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Job" placement="left">
            <IconButton
              onClick={deleteJob}
              disabled={isSubmitting}
              className="delete-btn"
            >
              <i className="fas fa-trash"></i>
            </IconButton>
          </Tooltip>
        </Col>
      </Row>
    </form>
  );
};

export default UpdateJobForm;
