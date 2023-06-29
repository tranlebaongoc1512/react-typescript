import React, { useEffect } from 'react'
import GoogleButton from 'react-google-button';
import { useNavigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useTheme from './hooks/useTheme';

export default function Login() {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async values => {
            // login
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Required").email("Invalid email"),
            password: Yup.string().required("Required"),
        }),

    });
    const { theme } = useTheme();
    const { googleSignIn, user } = useAuth();
    const navigate = useNavigate()
    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        if (user?.email) {
            navigate('/')
        }
    }, [user])
    return (
        <Container maxWidth="md" className='component-container'>
            <Typography variant="h4" gutterBottom>Login</Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    sx={{ background: theme.inputBackground, borderRadius: '4px' }}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="none"
                    type="email"
                    InputLabelProps={{ style: { color: theme.color } }}
                    InputProps={{ style: { color: theme.color } }}
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                />
                <div style={{ height: '25px' }}>
                    {formik.errors.email && formik.touched.email && (<Typography variant="caption" color="red">{formik.errors.email}</Typography>)}
                </div>
                <TextField
                    sx={{ background: theme.inputBackground, borderRadius: '4px' }}
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="none"
                    type='password'
                    InputLabelProps={{ style: { color: theme.color } }}
                    InputProps={{ style: { color: theme.color } }}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                />
                <div style={{ height: '25px' }}>
                    {formik.errors.password && formik.touched.password && (<Typography variant="caption" color="red">{formik.errors.password}</Typography>)}
                </div>
                <Button type="submit" variant="contained" sx={{ background: theme.inputBackground, color: theme.color }}>Login</Button>
            </form>
            <Typography variant="body1" paragraph sx={{ textAlign: 'center', padding: '30px' }}>
                Or sign in with
            </Typography>
            <div>
                <GoogleButton onClick={handleGoogleSignIn} style={{ marginLeft: 'auto', marginRight: 'auto' }} />
            </div>
        </Container>
    )
}
