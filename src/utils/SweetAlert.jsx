import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Modal, Typography, Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// eslint-disable-next-line react/prop-types
const SweetAlert = ({ open, onClose, severity, message, buttonEnabled }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          width: '40%',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Alert
            severity={severity}
            iconMapping={{
              success: <CheckCircleOutlineIcon fontSize="large" />
            }}
            action={
              <IconButton aria-label="close" color="inherit" size="small" onClick={onClose}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '20px',
              borderRadius: '8px'
            }}
          >
            <Typography variant="h5" style={{ flex: 1, marginLeft: '10px' }}>
              {message}
            </Typography>
          </Alert>
        </Box>
        {buttonEnabled && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={onClose}
              disabled={!buttonEnabled}
              style={{
                padding: '10px 20px',
                textTransform: 'none',
                boxShadow: 'none',
                transition: 'background-color 0.3s ease-in-out'
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#3a8dff')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}
            >
              OK
            </Button>
          </Box>
        )}
      </div>
    </Modal>
  );
};

export default SweetAlert;

/*
Copy Paste from here to use sweet alert in any component (Severity: 'error' | 'info' | 'success' | 'warning')
const [alertOpen, setAlertOpen] = useState(false);
const [alertSeverity, setAlertSeverity] = useState('success');
const [alertMessage, setAlertMessage] = useState('');

const handleAlert = (severity, message) => {
  setAlertSeverity(severity);
  setAlertMessage(message);
  setAlertOpen(true);
};
const handleCloseAlert = () => {
  setAlertOpen(false);
  setAlertSeverity('');
  setAlertMessage('');
};

<SweetAlert
      open={alertOpen}
      severity={alertSeverity}
      message={alertMessage}
      onClose={handleCloseAlert}
      buttonEnabled={true}
/>
*/
