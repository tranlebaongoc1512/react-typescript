import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import { Container, Typography, TextField, Button } from '@mui/material';
import { ThemeContext } from './ThemeContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function SignUp() {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            retypePassword: "",
        },
        onSubmit: async values => {
            // sign up
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Required").email("Invalid email"),
            password: Yup.string()
                .required("Required")
                .min(8, "Password must be at least 8 characters")
                .matches(
                    /^(?=.*[A-Z])(?=.*[0-9])/,
                    "Password must include uppercase letters and numbers"
                ),
            retypePassword: Yup.string().required("Required").oneOf([Yup.ref("password")], "Retyppe password must match with password"),
        }),

    });
    const { theme } = useContext(ThemeContext);
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (user?.email) {
            navigate('/');
        }
    }, [user])
    return (
        <Container maxWidth="md" className='component-container'>
            <Typography variant="h4" gutterBottom>Sign Up</Typography>
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
                    InputLabelProps={{ style: { color: theme.color } }}
                    InputProps={{ style: { color: theme.color } }}
                    name="password"
                    type='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                />
                <div style={{ height: '25px' }}>
                    {formik.errors.password && formik.touched.password && (<Typography variant="caption" color="red">{formik.errors.password}</Typography>)}
                </div>
                <TextField
                    sx={{ background: theme.inputBackground, borderRadius: '4px' }}
                    label="Retype Password"
                    variant="outlined"
                    fullWidth
                    margin="none"
                    InputLabelProps={{ style: { color: theme.color } }}
                    InputProps={{ style: { color: theme.color } }}
                    name="retypePassword"
                    type='password'
                    value={formik.values.retypePassword}
                    onChange={formik.handleChange}
                    error={formik.touched.retypePassword && Boolean(formik.errors.retypePassword)}
                />
                <div style={{ height: '25px' }}>
                    {formik.errors.retypePassword && formik.touched.retypePassword && (<Typography variant="caption" color="red">{formik.errors.retypePassword}</Typography>)}
                </div>
                <Button type="submit" variant="contained" sx={{ background: theme.inputBackground, color: theme.color }}>Sign up</Button>
            </form>
        </Container>
    )
}
