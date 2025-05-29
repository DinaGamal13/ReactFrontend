import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../Fetch/axios'
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

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false); const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => event.preventDefault();
    const handleMouseUpPassword = (event) => event.preventDefault();

    const validationSchema = Yup.object({
        username: Yup.string()
            .required('Required')
            .matches(/^[^\d]*$/, 'Username must contain only characters')
            .min(3, 'Username must be at least 3 characters'),
        email: Yup.string()
            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email must be like (example@example.com)')
            .required('Required'),
        password: Yup.string()
            .required('Required')
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[@$!%*?&]/, 'Password must contain at least one special character'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validateOnChange: true,
        validateOnBlur: true,
        validate: (values) => {
            try {
                validationSchema.validateSync(values, { abortEarly: false });
                return {};
            } catch (err) {
                const errors = {};

                err.inner.forEach((error) => {
                    const field = error.path;
                    const value = values[field];

                    if (!errors[field]) {
                        errors[field] = [];
                    }
                    if (!value) {
                        if (!errors[field].includes('Required')) {
                            errors[field] = ['Required'];
                        }
                    } else {
                        if (!errors[field].includes(error.message) && error.message !== 'Required') {
                            errors[field].push(error.message);
                        }
                    }
                });

                return errors;
            }
        },
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const res = await axios.post('/api/auth/register', {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                });
                localStorage.setItem('token', res.data.access_token);
                localStorage.setItem('userName', res.data.username);
                localStorage.setItem('userId', res.data.userId);

                console.log('Signup success:', res.data);
                console.log(res.data.userId);
                setSnackbarOpen(true);
                setLoading(false);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } catch (error) {
                if (error.response) {
                    const emailError = error.response.data.message;
                    if (emailError && (typeof emailError === 'string') && emailError.toLowerCase().includes('email')) {
                        formik.setErrors({ email: 'Email is already registered' });
                    } else if (Array.isArray(emailError)) {
                        emailError.forEach(msg => {
                            if (msg.toLowerCase().includes('email')) {
                                formik.setErrors({ email: 'Email is already registered' });
                            }
                        });
                    }
                } else {
                    console.error('Something went wrong:', error.message);
                }
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
                    <h1 style={{ fontFamily: 'Irish Grover', fontSize: '40px', color: '#626F47' }}>Sign up</h1>
                    <form onSubmit={formik.handleSubmit} className='fields'>
                        <MyTextField
                            formik={formik}
                            name="username"
                            label="UserName"
                        />

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
                        <MyPasswordField
                            formik={formik}
                            name="confirmPassword"
                            label="Confirm Password"
                            value={formik.values.confirmPassword}
                            showPassword={showConfirmPassword}
                            handleTogglePassword={handleClickShowConfirmPassword}
                            handleMouseDown={handleMouseDownPassword}
                            handleMouseUp={handleMouseUpPassword}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            style={{
                                width: '408px',
                                marginTop: '5px',
                                padding: '10px',
                                backgroundColor: '#626F47',
                                color: '#F8F3D9',
                                textTransform: 'none'
                            }}
                        >
                            Signup
                        </Button>
                    </form>
                    <div className='AlreadyIn'>
                        <p>Already in Pluma?</p>
                        <Link to='/login' style={{
                            color: '#626F47',
                            opacity: '77%',
                        }}>
                            <p style={{
                                textDecoration: 'underline',
                                fontFamily: 'Irish Grover',
                                cursor: 'pointer'
                            }}>Login</p>
                        </Link>
                    </div>
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={1000}
                        onClose={() => setSnackbarOpen(false)}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        style={{ marginLeft: '40ch', marginTop: '4ch' }}
                    >
                        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                            Sign Up Successfully!
                        </Alert>
                    </Snackbar>
                </div>
            </div>
        </div>
    )
}