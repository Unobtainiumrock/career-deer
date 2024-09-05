// import React from 'react';
// // Redux stuff
// import { Field, reduxForm, FieldArray, reset } from 'redux-form';
// import { Col, Row } from '../Grid';
// import { TextField } from 'redux-form-material-ui';
// import { validate } from './validate';
// import Paper from '@material-ui/core/Paper';
// import './UpdateJobForm.css';
// // import Button from '@material-ui/core/Button';
// import Tooltip from '@material-ui/core/Tooltip';
// import IconButton from '@material-ui/core/IconButton';

// const renderTextField = (
//   {
//     input,
//     label,
//     required,
//     dateField,
//     textArea,
//     meta: { touched, error },
//     ...custom
//   }) => (
//     <TextField
//       // don't show the hint text when it's a date because the default date always shows
//       hintText={!dateField && label}
//       // add the asterisk to the end of the label if it's a required field
//       floatingLabelText={label + (required ? '*' : '')}
//       // show the label above the date always because we're not showing the hint text
//       floatingLabelFixed={!!dateField}
//       // defines the error text
//       errorText={touched && error && <span>{error}</span>}

//       {...input}
//       {...custom}
//     />
//   );

// const renderNote = (
//   {
//     fields
//   }) => (
//     <React.Fragment>
//     <Row className="justify-content-center text-right">
//     <Col size="12 lg-6">
//     </Col>
//     <Col size="12 lg-6">
//     <Tooltip id="tooltip-icon" title="Add A Note" placement="top">
//     <IconButton className="add-btn" type="Button" onClick={()=>fields.push()}><i className="fas fa-plus"></i></IconButton>
//     </Tooltip>
//     </Col>
//     </Row>
//     <ul className="mt-3">
//       {fields.map((note, index) => (
//         <li key={index}>
//         <Paper>
//         <Tooltip id="tooltip-delete-icon" title="Delete Note" placement="top">
//           <IconButton variant="fab" className="float-right delete-note" onClick={() => fields.remove(index)}><i className="fas fa-times"></i></IconButton>
//         </Tooltip>
//         <Row className="justify-content-center px-3 my-3">
//         <Col size="8 md-11">
//           <Field className="text-input"
//             floatingLabelText={`Note #${index + 1}`}
//             floatingLabelFixed={true}
//             name={note}
//             label={`Note $${index + 1}`}
//             multiLine={true}
//             // sets the initial and maximum size of the text box
//             rows={2}
//             rowsMax={4}
//             type='text'
//             component={TextField}
//           />
//         </Col>
//         </Row>
//         </Paper>
//         </li>

//       ))}
//     </ul>
//     </React.Fragment>
//   )

// let UpdateJobForm = ({ deleteJob, handleSubmit, pristine, submitting, errorMessage }) => {
//   return (
//     <form onSubmit={handleSubmit}>
//     <Row className="justify-content-center">
//     <Col size="12 md-12 lg-6">
//         <Field className="text-input" name="title" component={renderTextField} type="text" label="Job Title" required></Field>
//     </Col>
//     <Col size="12 md-12 lg-6">
//         <Field className="text-input" name="company_name" component={renderTextField} type="text" label="Company" required></Field>
//     </Col>
//     </Row>
//     <Row className="justify-content-center">
//       <Col size="12 md-12 lg-6">
//         <Field className="text-input" name="location" component={renderTextField} type="text" label="Location"></Field>
//       </Col>
//       <Col size="12 md-12 lg-6">
//         <Field className="text-input" name="url" component={renderTextField} type="text" label="Link URL"></Field>
//       </Col>
//       </Row>
//       <Row className="justify-content-center">
//       <Col size="12 md-12 lg-6">
//         <Field className="text-input" name="post_date" component={renderTextField} type="date" label="Job Post Date" dateField></Field>
//       </Col>
//       <Col size="12 md-12 lg-6">
//       </Col>
//       </Row>
//         <FieldArray className="text-input" name="note" component={renderNote} type="text" label="note" textArea></FieldArray>
//         <Row className="justify-content-center text-right">
//         <Col size="12 md-12 lg-6">
//         </Col>        
//         <Col size="12 md-12 lg-6">
//         <h6>{errorMessage}</h6>
//         <Tooltip id="tooltip-icon" title="Save changes" placement="left">
//         <IconButton className="save-btn" variant="contained" color="primary" type="submit" disabled={submitting}>
//           <i className="fas fa-save"></i>
//         </IconButton> 
//         </Tooltip>
//         <p className="my-1">* indicates a required field.</p>
//         </Col>
//         </Row>
//     </form>
//   );
// };

// UpdateJobForm = reduxForm({
//   // a unique name for the form
//   form: 'addjob',
//   validate,
//   onSubmitSuccess: (result, dispatch) => dispatch(reset('addjob'))
// })(UpdateJobForm);

// // Inside this file, we wrapped our component inside the imported 'reduxForm' function
// // We can think of reduxForm() from redux-form behaving similar to connect() from react-redux in
// // terms of connecting a component to communicate with the store 
// export default UpdateJobForm;

import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { TextField, IconButton, Tooltip, Paper } from '@material-ui/core';
import { Col, Row } from '../Grid';
import { validate } from './validate';
import './UpdateJobForm.css';

const FormStyle = {
  background: '#fff',
  borderRadius: '15px',
  marginTop: '10px',
  padding: '10px',
  boxShadow: '0px 0px 1px #5B5B5B'
};

const UpdateJobForm = ({ deleteJob, errorMessage }) => {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      title: '',
      company_name: '',
      location: '',
      url: '',
      post_date: '',
      notes: [{ content: '' }]
    },
    resolver: async (data, context) => {
      return validate(data) || { values: data, errors: {} };
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "notes"
  });

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <form style={FormStyle} onSubmit={handleSubmit(onSubmit)}>
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
        {fields.map((field, index) => (
          <Row key={field.id}>
            <Col size="12 md-12 lg-6">
              <Paper style={{ padding: '10px', marginBottom: '10px' }}>
                <Controller
                  name={`notes[${index}].content`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={`Note #${index + 1}`}
                      multiline
                      rows={2}
                      rowsMax={4}
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <Tooltip title="Delete Note" placement="top">
                  <IconButton onClick={() => remove(index)}><i className="fas fa-times"></i></IconButton>
                </Tooltip>
              </Paper>
            </Col>
          </Row>
        ))}
        <Tooltip title="Add A Note" placement="top">
          <IconButton onClick={() => append({ content: '' })}><i className="fas fa-plus"></i></IconButton>
        </Tooltip>
      </Row>
      <Row className="justify-content-end">
        <Col size="12">
          <h6>{errorMessage}</h6>
        </Col>
        <Col size="10 md-10 lg-6" className="text-right">
          <Tooltip title="Save changes" placement="left">
            <IconButton type="submit" disabled={isSubmitting} className="save-btn">
              <i className="fas fa-save"></i>
            </IconButton>
          </Tooltip>
        </Col>
      </Row>
    </form>
  );
};

export default UpdateJobForm;
