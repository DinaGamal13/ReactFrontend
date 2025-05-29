import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import axios from '../Fetch/axios'
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MyTextField from '../components/MyTextField';
import MyPasswordField from '../components/MyPasswordField';

function GradientCircularProgress() {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E3D095" />
            <stop offset="100%" stopColor="#626F47" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
    </React.Fragment>
  );
}

const loginAPI = async (email, password) => {
  const response = await axios.post('/api/auth/login', {
    email,
    password,
  });
  return response.data;
};
export default function Login() {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [showPassword, setShowPassword] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const [loginError, setLoginError] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setLoginError('');
        const data = await loginAPI(values.email, values.password);
        console.log(data);

        localStorage.setItem('token', data.access_token);
        localStorage.setItem('userName', data.username);
        localStorage.setItem('userId', data.userId);

        setSnackbarOpen(true);
        setLoading(false);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        setLoginError('Email or password incorrect');

        setTimeout(() => {
          setLoading(false);
          setLoginError(' ');
        }, 1000);
      }
    }

  });

  return (
    <div className='Body'>

      <div className='bgcolor'>
        <div className='insideLeft'>
          <div className='logoTitle'>
            <img src="/logo.png" alt="" />
            <h1 className='title'>Welcome in Pluma</h1>
          </div>
          <img src="/pluma.png" alt="" />
        </div>
        <div className='insideRight'>
          {
            loading && <div style={{ marginBottom: '1rem', color: '#626F47' }}>
              <GradientCircularProgress />
            </div>
          }
          <h1 style={{
            fontFamily: 'Irish Grover',
            fontSize: '40px',
            color: '#626F47'
          }}>Login</h1>
          <div className='fields'>
            <MyTextField
              formik={formik}
              name="email"
              label="Email"
            />
            <MyPasswordField
              formik={formik}
              name="password"
              label="Password"
              value={formik.values.password}
              showPassword={showPassword}
              handleTogglePassword={handleClickShowPassword}
              handleMouseDown={handleMouseDownPassword}
              handleMouseUp={handleMouseUpPassword}
            />
          </div>
          <div className='remember'>
            <Checkbox {...label} style={{
              color: '#7C7C7C'
            }} />
            <label htmlFor="">Remember Me</label>
          </div>
          <hr style={{
            width: '420px',
            border: '2px solid #626F47',
            opacity: '42%'
          }} />

          {loginError && (
            <div style={{ color: 'red', marginTop: '10px' }}>
              {loginError}
            </div>
          )}

          <Button
            variant="contained" onClick={formik.handleSubmit} style={{
              width: '430px',
              marginTop: '5px',
              padding: '10px',
              backgroundColor: '#626F47',
              color: '#F8F3D9',
              textTransform: 'none'
            }}>Login
          </Button>
          <div className='AlreadyIn'>
            <p>New in Pluma?</p>
            <Link to='/signup' style={{
              color: '#626F47',
              opacity: '77%',
            }}>
              <p style={{
                textDecoration: 'underline',
                fontFamily: 'Irish Grover',
                cursor: 'pointer'
              }}>Sign Up</p>
            </Link>
          </div>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={1000}
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            style={{ marginLeft: '40ch', marginTop: '6ch' }}
          >
            <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
              Login Successfully!
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  )
}
