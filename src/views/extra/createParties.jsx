/* eslint-disable react-hooks/rules-of-hooks */
import {
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  Button,
  FormHelperText
} from '@mui/material';
import React, { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import BackdropLoading from 'utils/BackdropLoading';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  partyName: yup.string().required('Party Name is required'),
  partyType: yup.string().required('Party Type is required'),
  mobileNumber: yup.string().matches(/^[0-9]{10}$/, 'Invalid Mobile Number'),
  email: yup.string().email('Invalid Email Address')
  // Add more validations for GST and Bank Details as needed
});

const createParties = () => {
  const [OBState, setOBState] = useState(false);
  const [amount, setAmount] = useState('');
  const [partyWillPay, setPartyWillPay] = useState('');
  const [GSTState, setGSTState] = useState(false);
  const [bankDetailsState, setBankDetailsState] = useState(false);

  const handleRadioChange = (event) => {
    const willPay = event.target.value;
    setPartyWillPay(event.target.value);

    // Update the amount based on the radio button selection
    const newAmount = willPay === 'Yes' ? Math.abs(parseFloat(amount)) : -Math.abs(parseFloat(amount));
    setAmount(newAmount); // Convert back to string if necessary
  };

  const handleAmountChange = (event) => {
    const value = parseFloat(event.target.value);
    const newAmount = partyWillPay === 'Yes' ? Math.abs(value) : -Math.abs(value);
    setAmount(newAmount); // Convert back to string if necessary
  };

  const handleOBState = () => {
    setOBState(!OBState);
    setAmount('');
    setPartyWillPay('');
  };
  const handleGSTState = () => {
    setGSTState(!GSTState);
  };
  const handleBankDetailsState = () => {
    setBankDetailsState(!bankDetailsState);
  };
  return (
    <Formik
      initialValues={{
        partyName: '',
        partyType: '',
        mobileNumber: '',
        email: '',
        amount: '',
        gstNumber: '',
        legalBusinessName: '',
        stateOfSupply: '',
        billingAddress: '',
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        branchName: '',
        upiId: ''
        // partyWillPay: ''
        // Add more initial values as needed
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        // Handle form submission logic here
        console.log(values);
        // Reset form state or redirect upon successful submission
        setSubmitting(false);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, isSubmitting, isValid, dirty }) => (
        <Form>
          <React.Fragment>
            <BackdropLoading isLoading={false} />
            <Row>
              <Col>
                <Card>
                  <Card.Header>
                    <Card.Title as="h5">Create Parties</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={12} lg={12}>
                        <Typography variant="h5">Enter Party Details</Typography>
                      </Grid>

                      <Grid item xs={12} md={6} lg={6}>
                        <TextField
                          name="partyName"
                          label="Enter Party Name"
                          variant="outlined"
                          size="small"
                          fullWidth
                          required
                          value={values.partyName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.partyName && Boolean(errors.partyName)}
                          helperText={touched.partyName && errors.partyName}
                        />
                      </Grid>

                      <Grid item xs={12} md={6} lg={6}>
                        <FormControl fullWidth size="small">
                          <InputLabel id="demo-simple-select-label" required>
                            Party Type
                          </InputLabel>
                          <Select
                            label="Party Type"
                            id="partyType"
                            name="partyType"
                            value={values.partyType}
                            onChange={handleChange}
                            required
                            error={touched.partyType && Boolean(errors.partyType)}
                            helperText={touched.partyType && errors.partyType}
                          >
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={6} lg={6}>
                        <TextField
                          name="mobileNumber"
                          type="number"
                          label="Mobile Number (Optional)"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={values.mobileNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.mobileNumber && Boolean(errors.mobileNumber)}
                          helperText={touched.mobileNumber && errors.mobileNumber}
                        />
                      </Grid>

                      <Grid item xs={12} md={6} lg={6}>
                        <TextField
                          name="email"
                          label="Email (Optional)"
                          type="email"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Grid>

                      <Grid item xs={12} md={12} lg={12}>
                        <Link variant="body" color="secondary" onClick={handleOBState} style={{ cursor: 'pointer' }}>
                          + Add Opening Balance (If Any)
                        </Link>
                      </Grid>
                      {OBState && (
                        <>
                          <Grid item xs={12} md={12} lg={12}>
                            <FormControl>
                              <FormHelperText>
                                <Typography variant="caption" color="error">
                                  Please select an option
                                </Typography>
                              </FormHelperText>
                              <RadioGroup
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                value={partyWillPay}
                                onChange={handleRadioChange}
                              >
                                <FormControlLabel value="Yes" control={<Radio />} label="Party will Pay" />
                                <FormControlLabel value="No" control={<Radio />} label="Party will Receive" />
                              </RadioGroup>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={6} lg={6}>
                            <TextField
                              name="amount"
                              label="Amount*"
                              variant="outlined"
                              size="small"
                              type="number"
                              fullWidth
                              value={amount}
                              onChange={(e) => {
                                handleAmountChange(e);
                                handleChange(e);
                              }}
                              disabled={partyWillPay === ''}
                            />
                          </Grid>
                        </>
                      )}
                      <Grid item xs={12} md={12} lg={12}>
                        <Link variant="body" color="secondary" onClick={handleGSTState} style={{ cursor: 'pointer' }}>
                          + Add GST Details (Optional)
                        </Link>
                      </Grid>

                      {GSTState && (
                        <>
                          <Grid item xs={12} md={6} lg={6}>
                            <TextField
                              name="gstNumber"
                              label="GST Number"
                              variant="outlined"
                              size="small"
                              fullWidth
                              value={values.gstNumber}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} md={6} lg={6}>
                            <TextField
                              name="legalBusinessName"
                              label="Legal Business Name"
                              variant="outlined"
                              size="small"
                              fullWidth
                              value={values.legalBusinessName}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} md={6} lg={6}>
                            <FormControl fullWidth size="small">
                              <InputLabel id="demo-simple-select-label">State of Supply</InputLabel>
                              <Select
                                name="stateOfSupply"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="State of Supply"
                                size="small"
                                fullWidth
                                value={values.stateOfSupply}
                                onChange={handleChange}
                              >
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={6} lg={6}>
                            <TextField
                              name="billingAddress"
                              label="Billing Address"
                              variant="outlined"
                              size="small"
                              fullWidth
                              value={values.billingAddress}
                              onChange={handleChange}
                            />
                          </Grid>
                        </>
                      )}

                      <Grid item xs={12} md={12} lg={12}>
                        <Link variant="body" color="secondary" style={{ cursor: 'pointer' }} onClick={handleBankDetailsState}>
                          + Add Bank Details (Optional)
                        </Link>
                      </Grid>
                      {bankDetailsState && (
                        <>
                          <Grid item xs={12} md={6} lg={6}>
                            <TextField
                              name="bankName"
                              label="Bank Name"
                              variant="outlined"
                              size="small"
                              fullWidth
                              value={values.bankName}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} md={6} lg={6}>
                            <TextField
                              name="accountNumber"
                              label="Account Number"
                              variant="outlined"
                              size="small"
                              fullWidth
                              value={values.accountNumber}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} md={6} lg={6}>
                            <TextField
                              name="ifscCode"
                              label="IFSC Code"
                              variant="outlined"
                              size="small"
                              fullWidth
                              value={values.ifscCode}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} md={6} lg={6}>
                            <TextField
                              name="branchName"
                              label="Branch Name"
                              variant="outlined"
                              size="small"
                              fullWidth
                              value={values.branchName}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} md={6} lg={6}>
                            <TextField
                              name="upiId"
                              label="UPI ID"
                              variant="outlined"
                              size="small"
                              fullWidth
                              value={values.upiId}
                              onChange={handleChange}
                            />
                          </Grid>
                        </>
                      )}

                      <Grid item xs={12} md={12} lg={12} sx={{ textAlign: 'center' }}>
                        <Button variant="contained" type="submit" disabled={!isValid || !dirty || isSubmitting}>
                          Create Party
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
  );
};

export default createParties;
