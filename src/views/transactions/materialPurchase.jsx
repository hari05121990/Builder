/* eslint-disable react-hooks/rules-of-hooks */
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  ListItemButton,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  Button
} from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import BaseURL from 'utils/authAxios';
import BackdropLoading from 'utils/BackdropLoading';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ItemTable from 'views/tables/itemTable';

const validationSchema = Yup.object().shape({
  materialPurchaseDate: Yup.date().required('Payment Date is required').max(new Date(), 'Payment Date cannot be in the future'),
  partyName: Yup.string().required('Party Name is required'),
  amountPaid: Yup.number().required('Amount Recieved is required').positive('Amount Recieved must be positive'),
  paymentMode: Yup.string().required('Payment Mode is required')
});
const materialPurchase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [partyNames, setPartyNames] = useState([]);
  const [invoiceRows, setInvoiceRows] = useState([{ item: '', qty: 0, unit: 'NONE', price: 0, taxpercent: 0, amount: 0 }]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [additionalCharges, setAdditionalCharges] = useState(0);
  const [discount, setDiscount] = useState(0);
  const getPartyNames = async () => {
    setIsLoading(true);
    try {
      const response = await BaseURL.get('api/parties');
      if (response.data.data) {
        setPartyNames(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getPartyNames();
  }, []);

  useEffect(() => {
    let total = 0;
    invoiceRows.forEach((row) => {
      total += row.amount;
    });

    // Ensure additionalCharges and discount default to 0 if they are empty, null, or undefined
    const charges = additionalCharges || 0;
    const disc = discount || 0;

    setTotalAmount(total + charges - disc);
  }, [invoiceRows, additionalCharges, discount]);

  return (
    <div>
      <Formik
        initialValues={{
          materialPurchaseDate: dayjs().format('YYYY-MM-DD'), // Set default to today's date
          partyName: '',
          amountPaid: 0,
          description: '',
          paymentMode: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(values);
          setIsLoading(true);
          BaseURL.post('api/add/paymentin', { ...values, projectId: 1, createdBy: 1, totalAmount })
            .then((res) => {
              console.log(res);
              if (res.data) {
                Swal.fire({
                  title: 'Payment In Added Successfully',
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
              resetForm();
            });
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <React.Fragment>
              <BackdropLoading isLoading={isLoading} />
              <Row>
                <Col>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h5">Material Purchase</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                          <Typography variant="h5">Enter Material Details</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} style={{ width: '100%' }}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Payment Date"
                              name="materialPurchaseDate"
                              format="DD/MM/YYYY"
                              value={values.materialPurchaseDate ? dayjs(values.materialPurchaseDate) : null}
                              onChange={(newValue) =>
                                setFieldValue('materialPurchaseDate', newValue ? dayjs(newValue).format('YYYY-MM-DD') : null)
                              }
                              slotProps={{
                                textField: {
                                  fullWidth: true,
                                  size: 'small',
                                  error: Boolean(touched.materialPurchaseDate && errors.materialPurchaseDate),
                                  helperText: touched.materialPurchaseDate && errors.materialPurchaseDate
                                }
                              }}
                            />{' '}
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth size="small" error={Boolean(touched.categoryId && errors.categoryId)}>
                            <InputLabel required>Party Name</InputLabel>
                            <Select
                              label="partyName"
                              id="partyName"
                              name="partyName"
                              value={values.partyName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            >
                              <MenuItem value="">
                                <ListItemButton>
                                  <ListItemText primary="+ Add Party" />
                                </ListItemButton>
                              </MenuItem>
                              {partyNames.map((party) => (
                                <MenuItem key={party.party_id} value={party.party_id}>
                                  {party.name}
                                </MenuItem>
                              ))}
                            </Select>
                            {touched.partyName && errors.partyName && (
                              <Typography color="error" variant="caption">
                                {errors.partyName}
                              </Typography>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <ItemTable
                            rows={invoiceRows}
                            setRows={setInvoiceRows}
                            setTotalAmount={setTotalAmount}
                            totalAmount={totalAmount}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            name="discount"
                            id="discount"
                            label="Discount, if any"
                            type="number"
                            size="small"
                            value={discount}
                            onChange={(e) => setDiscount(parseInt(e.target.value, 10))}
                            fullWidth
                            variant="outlined"
                          />
                        </Grid>{' '}
                        <Grid item xs={12} sm={6}>
                          <TextField
                            name="additionalCharges"
                            id="additionalCharges"
                            label="Additional Charges, if any"
                            type="number"
                            size="small"
                            value={additionalCharges}
                            onChange={(e) => setAdditionalCharges(parseInt(e.target.value, 10))}
                            fullWidth
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            name="description"
                            id="description"
                            label="Description, if any"
                            size="small"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            name="amountPaid"
                            id="amountPaid"
                            label="Amount Paid"
                            type="number"
                            size="small"
                            value={values.amountPaid}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                            variant="outlined"
                            required
                            error={Boolean(touched.amountPaid && errors.amountPaid)}
                            helperText={touched.amountPaid && errors.amountPaid}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}></Grid>
                        <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'space-around' }}>
                          <Typography variant="body2">Balance</Typography>
                          <Typography variant="h6">{totalAmount - values.amountPaid}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl component="fieldset" error={Boolean(touched.paymentMode && errors.paymentMode)}>
                            <FormHelperText>
                              <Typography variant="caption" color="error">
                                {touched.paymentMode && errors.paymentMode ? errors.paymentMode : 'Please select an option'}
                              </Typography>
                            </FormHelperText>
                            <RadioGroup
                              row
                              aria-labelledby="demo-radio-buttons-group-label"
                              name="paymentMode" // Make sure this matches the form field name
                              value={values.paymentMode}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur} // Add this for formik's blur handling
                            >
                              <FormControlLabel value="Cash" control={<Radio size="small" />} label="Cash" />
                              <FormControlLabel value="Bank" control={<Radio size="small" />} label="Bank" />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
                          <Button variant="contained" color="primary" type="submit" disabled={isSubmitting || isLoading}>
                            Save{' '}
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

export default materialPurchase;
