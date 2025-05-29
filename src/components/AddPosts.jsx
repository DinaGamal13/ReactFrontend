import { Button, Snackbar, Alert, TextField } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
import axios from '../Fetch/axios'
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import UploadImage from './UploadImage'
import MyTextField from './MyTextField';

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
export default function AddPosts() {
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const { id } = useParams();

    const [open, setOpen] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(prev => ({ ...prev, open: false }));
    };

    const validationSchema = Yup.object({
        title: Yup.string()
            .required('Post Title is required')
            .matches(/^[^0-9!@#$%^&*()_+={}[\]:;"'<>,.?/\\|`~]*$/, 'Title must not contain numbers or special characters')
            .min(3, 'Title must be at least 3 characters')
            .max(100, 'Title must not exceed 100 characters'),
        description: Yup.string()
            .required('Description is required')
            .min(10, 'Description must be at least 10 characters')
            .max(1000, 'Description must not exceed 1000 characters'),
        image: Yup.mixed()
            .test('image-required', 'Image is required', function (value) {
                return selectedImage !== null;
            }),
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            image: ''
        },
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                setSuccess(false);
                let imageUrl = selectedImage;

                if (selectedImage instanceof File) {
                    const formDataForImgbb = new FormData();
                    formDataForImgbb.append('image', selectedImage);

                    const imgbbResponse = await fetch('https://api.imgbb.com/1/upload?key=e4c6259f7966bc2547e5d2d5751430e1', {
                        method: 'POST',
                        body: formDataForImgbb,
                    });

                    const data = await imgbbResponse.json();
                    imageUrl = data.data.url;
                }

                const token = localStorage.getItem('token');

                if (id) {
                    const res = await axios.put(`http://localhost:3000/api/posts/${id}`, {
                        title: values.title,
                        description: values.description,
                        imageUrl,
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log('Post updated:', res.data);
                } else {
                    const res = await axios.post('http://localhost:3000/api/posts', {
                        title: values.title,
                        description: values.description,
                        imageUrl,
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log('Post created:', res.data);
                }

                setLoading(false);
                setSuccess(true);
                setOpen(prev => ({ ...prev, open: true }));

                setTimeout(() => {
                    navigate('/');
                }, 1000);

            } catch (error) {
                console.error('Error saving post:', error);
                setLoading(false);
            }
        }

    });

    useEffect(() => {
        if (id) {
            const fetchPostDetails = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const res = await axios.get(`http://localhost:3000/api/posts/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const post = res.data;
                    formik.setValues({
                        title: post.title,
                        description: post.description,
                    });
                    setSelectedImage(post.imageUrl);
                } catch (error) {
                    console.error('Error fetching post:', error);
                }
            };

            fetchPostDetails();
        }
    }, [id]);

    useEffect(() => {
        if (selectedImage) {
            if (typeof selectedImage === 'string') {
                setPreviewImage(selectedImage);
            } else {
                setPreviewImage(URL.createObjectURL(selectedImage));
            }
        }
    }, [selectedImage]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: '5.3ch' }}>
            {
                loading && <div style={{ marginBottom: '1rem', color: '#626F47' }}>
                    <GradientCircularProgress />
                </div>
            }

            {
                success && <div style={{ marginTop: '1rem', color: 'green' }}>
                    <Snackbar
                        open={open.open}
                        autoHideDuration={2000}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        style={{ marginTop: '5ch' }}
                    >
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Posts {id ? 'Updated' : 'Added'} Successfully!
                        </Alert>
                    </Snackbar>
                </div>
            }
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10ch' }}>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <h1 style={{ fontFamily: 'Irish Grover', fontSize: '4ch', color: '#626F47', textAlign: 'center' }}>Preview Your Post</h1>
                    <Card sx={{ maxWidth: 400, height: '58ch' }} style={{ backgroundColor: '#E3D095' }}>
                        <CardHeader
                            style={{
                                backgroundColor: '#626F47'
                            }}

                            title={formik.values.title}
                            titleTypographyProps={{
                                fontSize: '2ch',
                                color: '#F8F3D9',
                                fontWeight: 'bold',
                                height: '4ch'
                            }}
                            subheaderTypographyProps={{
                                fontSize: '1.8ch',
                                color: '#E0E0E0',
                            }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '1ch', }}>

                            <CardMedia
                                component="img"
                                height="235"
                                src={previewImage}
                                style={{ width: '48ch', border: 'none' }}

                            />
                        </div>
                        <CardContent>
                            <Typography variant="body2" style={{ color: '#414A2F', fontSize: '2ch' }}>
                                {formik.values.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>


                <div style={{ border: '2px solid #E3D095', padding: '4ch', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '2ch' }}>
                    <h1 style={{ fontFamily: 'Irish Grover', fontSize: '4ch', color: '#626F47', textAlign: 'center' }}>
                        {id ? 'Edit' : 'Create'} Your Own Post
                    </h1>
                    <form onSubmit={formik.handleSubmit} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '2ch' }}>
                        <MyTextField
                            formik={formik}
                            name="title"
                            label="Post Title"
                        />
                        <MyTextField
                            formik={formik}
                            name="description"
                            label="Description"
                            multiline={true}
                            rows={4}
                        />
                        <div style={{ display: 'flex', gap: '1ch', flexDirection: 'column' }}>
                            <UploadImage
                                previewImage={previewImage}
                                setPreviewImage={setPreviewImage}
                                setSelectedImage={setSelectedImage}
                            />
                            {formik.touched.image && formik.errors.image && !previewImage && (
                                <div style={{ color: 'red', fontSize: '14px', textAlign: 'left' }}>{formik.errors.image}</div>
                            )}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1.3ch' }}>
                            <Button variant="outlined" style={{ borderColor: '#626F47', color: '#626F47', textTransform: 'none', padding: '0.7ch 8.2ch', fontSize: '2ch' }} onClick={() => navigate('/')}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                style={{
                                    color: '#F8F3D9',
                                    backgroundColor: '#626F47',
                                    textTransform: 'none',
                                    padding: '0.7ch 8.2ch',
                                    fontSize: '2ch',
                                }}
                                type="submit"
                                onClick={formik.handleSubmit}
                                disabled={loading}
                            >
                                {loading ? (id ? 'Updating...' : 'Publishing...') : (id ? 'Update' : 'Publish')}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}