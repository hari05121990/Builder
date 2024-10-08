/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import BaseURL from 'utils/authAxios';
import BackdropLoading from 'utils/BackdropLoading';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  materialName: yup.string().required('Material Name is required'),
  categoryId: yup.string().required('Category is required'),
  unit: yup.string().required('Unit is required'),
  GST: yup.string().required('GST is required')
});

const addMaterial = () => {
  const [isLoading, setIsLoading] = useState(false);
  const currentUserId = 1;
  const [gst, setGst] = useState([]);
  const [category, setCategory] = useState([]);
  const [units, setUnits] = useState([]);
  useEffect(() => {
    const getGST = async () => {
      try {
        const response = await BaseURL.get('api/gst');
        if (response.data.data) {
          setGst(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getCategory = async () => {
      try {
        const response = await BaseURL.get('api/category');
        if (response.data.data) {
          setCategory(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getUnits = async () => {
      try {
        const response = await BaseURL.get('api/units');
        if (response.data.data) {
          setUnits(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUnits();
    getCategory();
    getGST();
  }, []);
  return (
    <div>
      <Formik
        initialValues={{
          materialName: '',
          categoryId: '',
          unit: '',
          GST: '',
          description: '',
          price: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);

          setIsLoading(true);
          BaseURL.post('api/create/materials', {
            ...values,
            createdBy: currentUserId
          })
            .then((res) => {
              console.log(res);
              if (res.data) {
                Swal.fire({
                  title: 'Material Created Successfully',
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
            .finally(() => {
              setIsLoading(false);
              setSubmitting(false);
            });
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <Form onSubmit={handleSubmit}>
            <React.Fragment>
              <BackdropLoading isLoading={isLoading} />
              <Row>
                <Col>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h5">Add Material</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="h5">Enter Material Details</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            name="materialName"
                            label="Enter Material Name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            required
                            value={values.materialName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.materialName && errors.materialName)}
                            helperText={touched.materialName && errors.materialName}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth size="small" error={Boolean(touched.categoryId && errors.categoryId)}>
                            <InputLabel required>Category</InputLabel>
                            <Select
                              label="Category"
                              id="categoryId"
                              name="categoryId"
                              value={values.categoryId}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            >
                              <MenuItem value="">
                                <ListItemButton>
                                  <ListItemText primary="+ Add Category" />
                                </ListItemButton>
                              </MenuItem>
                              {category.map((category) => (
                                <MenuItem key={category.category_id} value={category.category_id}>
                                  {category.category_name}
                                </MenuItem>
                              ))}
                            </Select>
                            {touched.categoryId && errors.categoryId && (
                              <Typography color="error" variant="caption">
                                {errors.categoryId}
                              </Typography>
                            )}
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth size="small" error={Boolean(touched.GST && errors.GST)}>
                            <InputLabel required>GST</InputLabel>
                            <Select label="GST" id="GST" name="GST" value={values.GST} onChange={handleChange} onBlur={handleBlur} required>
                              <MenuItem value="">Select GST</MenuItem>
                              {gst.map((gst) => (
                                <MenuItem key={gst.gst_id} value={gst.gst_id}>
                                  {gst.igst}%
                                </MenuItem>
                              ))}
                            </Select>
                            {touched.GST && errors.GST && (
                              <Typography color="error" variant="caption">
                                {errors.GST}
                              </Typography>
                            )}
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            name="description"
                            label="Description"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.description && errors.description)}
                            helperText={touched.description && errors.description}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth size="small" error={Boolean(touched.unit && errors.unit)}>
                            <InputLabel required>Unit</InputLabel>
                            <Select
                              label="Unit"
                              id="unit"
                              name="unit"
                              value={values.unit}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            >
                              <MenuItem value="" disabled>Select Unit</MenuItem>
                              {units
                                .slice()
                                .sort((a, b) => a.unit_name.localeCompare(b.unit_name))
                                .map((unit) => (
                                  <MenuItem key={unit.unit_id} value={unit.unit_id}>
                                    {unit.unit_name}
                                  </MenuItem>
                                ))}{' '}
                            </Select>
                            {touched.unit && errors.unit && (
                              <Typography color="error" variant="caption">
                                {errors.unit}
                              </Typography>
                            )}
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            name="price"
                            label="Price"
                            variant="outlined"
                            size="small"
                            type="number"
                            fullWidth
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.price && errors.price)}
                            helperText={touched.price && errors.price}
                          />
                        </Grid>

                        <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
                          <Button variant="contained" color="primary" type="submit" disabled={isSubmitting || isLoading}>
                            Add Material
                          </Button>
                        </Grid>
                      </Grid>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </React.Fragment>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default addMaterial;
