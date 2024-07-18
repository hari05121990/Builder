import React, { useEffect, useState } from 'react';
import { Grid, TextField, Typography, Button } from '@mui/material';
import { Card, Col, Row } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import BaseURL from 'utils/authAxios';
import Swal from 'sweetalert2';
import BackdropLoading from 'utils/BackdropLoading';

// Define the validation schema using yup
const schema = yup.object().shape({
  projectName: yup.string().required('Project Name is required'),
  projectValue: yup.number().required('Project Value is required').positive('Project Value must be positive'),
  projectManager: yup.string().required('Project Manager is required'),
  city: yup.string().required('City is required'),
  projectDescription: yup.string().required('Project Description is required'),
  address: yup.string().required('Address is required'),
  startDate: yup.date().required('Start Date is required').nullable(),
  endDate: yup.date().nullable()
});

const CreateProject = () => {
  const [isLoading, setIsLoading] = useState(false);
  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];
  };
  const [formValues, setFormValues] = React.useState({
    projectName: '',
    projectValue: '',
    projectManager: '',
    city: '',
    projectDescription: '',
    address: '',
    startDate: null,
    endDate: null
  });

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  const onClickSubmit = () => {
    setIsLoading(true);
    BaseURL.post('api/create/projects', formValues)
      .then((res) => {
        console.log(res);
        if (res.data) {
          Swal.fire({
            title: 'Project Created Successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: 'Error',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <React.Fragment>
      <BackdropLoading isLoading={isLoading} />
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Create Project</Card.Title>
            </Card.Header>
            <Card.Body>
              <Formik
                initialValues={formValues}
                validationSchema={schema}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting, isValid, dirty }) => (
                  <Form>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={12} lg={12}>
                        <Typography variant="h5">Enter Project Details</Typography>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <TextField
                          label="Project Site Name"
                          name="projectName"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={values.projectName}
                          onChange={(e) => {
                            handleChange(e);
                            setFormValues({ ...formValues, projectName: e.target.value });
                          }}
                          onBlur={handleBlur}
                          error={touched.projectName && Boolean(errors.projectName)}
                          helperText={touched.projectName && errors.projectName}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <TextField
                          label="Project Value"
                          name="projectValue"
                          type="number"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={values.projectValue}
                          onChange={(e) => {
                            handleChange(e);
                            setFormValues({ ...formValues, projectValue: e.target.value });
                          }}
                          onBlur={handleBlur}
                          error={touched.projectValue && Boolean(errors.projectValue)}
                          helperText={touched.projectValue && errors.projectValue}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <TextField
                          label="Project Manager"
                          name="projectManager"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={values.projectManager}
                          onChange={(e) => {
                            handleChange(e);
                            setFormValues({ ...formValues, projectManager: e.target.value });
                          }}
                          onBlur={handleBlur}
                          error={touched.projectManager && Boolean(errors.projectManager)}
                          helperText={touched.projectManager && errors.projectManager}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <TextField
                          label="City"
                          name="city"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={values.city}
                          onChange={(e) => {
                            handleChange(e);
                            setFormValues({ ...formValues, city: e.target.value });
                          }}
                          onBlur={handleBlur}
                          error={touched.city && Boolean(errors.city)}
                          helperText={touched.city && errors.city}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <TextField
                          label="Project Description"
                          name="projectDescription"
                          multiline
                          rows={4}
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={values.projectDescription}
                          onChange={(e) => {
                            handleChange(e);
                            setFormValues({ ...formValues, projectDescription: e.target.value });
                          }}
                          onBlur={handleBlur}
                          error={touched.projectDescription && Boolean(errors.projectDescription)}
                          helperText={touched.projectDescription && errors.projectDescription}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <TextField
                          label="Address"
                          name="address"
                          multiline
                          rows={4}
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={values.address}
                          onChange={(e) => {
                            handleChange(e);
                            setFormValues({ ...formValues, address: e.target.value });
                          }}
                          onBlur={handleBlur}
                          error={touched.address && Boolean(errors.address)}
                          helperText={touched.address && errors.address}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Start Date"
                            format="DD-MM-YYYY"
                            value={values.startDate}
                            onChange={(newValue) => {
                              setFieldValue('startDate', newValue);
                              setFormValues({ ...formValues, startDate: dayjs(newValue).format('YYYY-MM-DD') });
                            }}
                            sx={{ width: '100%' }}
                            minDate={dayjs(getCurrentDate())}
                            slotProps={{
                              textField: {
                                variant: 'outlined',
                                size: 'small',
                                fullWidth: true
                              }
                            }}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="End Date"
                            format="DD-MM-YYYY"
                            value={values.endDate}
                            onChange={(newValue) => {
                              setFieldValue('endDate', newValue);
                              setFormValues({ ...formValues, endDate: dayjs(newValue).format('YYYY-MM-DD') });
                            }}
                            sx={{ width: '100%' }}
                            minDate={dayjs(formValues.startDate)}
                            slotProps={{
                              textField: {
                                variant: 'outlined',
                                size: 'small',
                                fullWidth: true
                              }
                            }}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={12} md={12} lg={12} sx={{ textAlign: 'center' }}>
                        <Button
                          variant="contained"
                          type="submit"
                          disabled={!isValid || !dirty || isSubmitting || formValues.startDate === null}
                          onClick={onClickSubmit}
                        >
                          Create Project
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default CreateProject;
