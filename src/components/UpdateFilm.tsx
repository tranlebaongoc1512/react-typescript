import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getFilm, updateFilm } from '../api/films';
import { useNavigate, useParams } from 'react-router-dom'
import useDocumentTitle from './hooks/useDocumentTitle';
import Swal from 'sweetalert2';
import LoadingButton from './LoadingButton';
import Film from './Film';
import useTheme from './hooks/useTheme';

export default function UpdateFilm() {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();
    useDocumentTitle("Update Film");
    const { theme } = useTheme();
    const filmId = useParams();
    const [film, setFilm] = useState<Film>({
        image: "",
        title: "",
        year: currentYear,
        nation: "",
        banner: "",
        info: "",
        trailer: "",
        rating: 0,
    });

    useEffect(() => {
        async function getFilmData() {
            const film = await getFilm(Number(filmId.id));
            setFilm(film);
        }
        getFilmData();
    }, [filmId]);
    useEffect(() => {
        formik.setValues(film);
    }, [film]);
    const formik = useFormik({
        initialValues: film,
        onSubmit: values => {
            Swal.fire({
                title: 'Do you want to save the changes?',
                showCancelButton: true,
                confirmButtonText: 'Save',
                cancelButtonColor: '#d33',
                background: theme.cardBackground,
                color: theme.color,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let trailer = values.trailer;
                    if (trailer) {
                        if (trailer.includes("youtu.be/")) {
                            trailer = trailer.split("/").pop();
                        } else if (trailer.includes("youtube.com/watch?v=")) {
                            trailer = trailer.split("=").pop();
                        }
                    }
                    await updateFilm(Number(filmId.id), { image: values.image, title: values.title, year: values.year, nation: values.nation, banner: values.banner, info: values.info, trailer: trailer, rating: values.rating });
                    navigate(`/detail/${filmId.id}`);
                    Swal.fire('Saved!', '', 'success');
                }
            })
        },
        validationSchema: Yup.object({
            image: Yup.string().required("Required"),
            title: Yup.string().required("Required"),
            year: Yup.number().required("Required").integer("Please input valid year").min(1894, "Year must be greater than 1894").max(currentYear, `Year must be less than ${currentYear}`),
            nation: Yup.string().required("Required"),
            banner: Yup.string().required("Required"),
            info: Yup.string().required("Required").max(700, "Please enter under 700 characters"),
            trailer: Yup.string().required("Required"),
            rating: Yup.number().required("Required").min(1, "Rating must be greater than 0").max(10, "Rating must be less than 10"),
        }),
    });

    return (
        <>
            {film.title !== "" ? (
                <Container maxWidth="md" className='component-container' sx={{ paddingBottom: '60px' }}>
                    <Typography variant="h4" gutterBottom>Update Film</Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            sx={{ background: theme.inputBackground, borderRadius: '4px' }}
                            label="Image URL"
                            variant="outlined"
                            fullWidth
                            margin="none"
                            name="image"
                            InputLabelProps={{ style: { color: theme.color } }}
                            InputProps={{ style: { color: theme.color } }}
                            value={formik.values.image}
                            onChange={formik.handleChange}
                            error={formik.touched.image && Boolean(formik.errors.image)}
                        />
                        <div style={{ height: '25px' }}>
                            {formik.errors.image && formik.touched.image && (<Typography variant="caption" color="red">{formik.errors.image}</Typography>)}
                        </div>
                        <TextField
                            sx={{ background: theme.inputBackground, borderRadius: '4px' }}
                            label="Title"
                            variant="outlined"
                            fullWidth
                            margin="none"
                            name="title"
                            InputLabelProps={{ style: { color: theme.color } }}
                            InputProps={{ style: { color: theme.color } }}
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                        />
                        <div style={{ height: '25px' }}>
                            {formik.errors.title && formik.touched.title && (<Typography variant="caption" color="red">{formik.errors.title}</Typography>)}
                        </div>
                        <TextField
                            sx={{ background: theme.inputBackground, borderRadius: '4px' }}
                            label="Year"
                            variant="outlined"
                            fullWidth
                            margin="none"
                            type="number"
                            name="year"
                            InputLabelProps={{ style: { color: theme.color } }}
                            InputProps={{ style: { color: theme.color } }}
                            value={formik.values.year}
                            onChange={formik.handleChange}
                            error={formik.touched.year && Boolean(formik.errors.year)}
                        />
                        <div style={{ height: '25px' }}>
                            {formik.errors.year && formik.touched.year && (<Typography variant="caption" color="red">{formik.errors.year}</Typography>)}
                        </div>
                        <TextField
                            sx={{ background: theme.inputBackground, borderRadius: '4px' }}
                            label="Nation"
                            variant="outlined"
                            fullWidth
                            margin="none"
                            name="nation"
                            InputLabelProps={{ style: { color: theme.color } }}
                            InputProps={{ style: { color: theme.color } }}
                            value={formik.values.nation}
                            onChange={formik.handleChange}
                            error={formik.touched.nation && Boolean(formik.errors.nation)}
                        />
                        <div style={{ height: '25px' }}>
                            {formik.errors.nation && formik.touched.nation && (<Typography variant="caption" color="red">{formik.errors.nation}</Typography>)}
                        </div>
                        <TextField
                            sx={{ background: theme.inputBackground, borderRadius: '4px' }}
                            label="Banner URL"
                            variant="outlined"
                            fullWidth
                            margin="none"
                            name="banner"
                            InputLabelProps={{ style: { color: theme.color } }}
                            InputProps={{ style: { color: theme.color } }}
                            value={formik.values.banner}
                            onChange={formik.handleChange}
                            error={formik.touched.banner && Boolean(formik.errors.banner)}
                        />
                        <div style={{ height: '25px' }}>
                            {formik.errors.banner && formik.touched.banner && (<Typography variant="caption" color="red">{formik.errors.banner}</Typography>)}
                        </div>
                        <TextField
                            sx={{ background: theme.inputBackground, borderRadius: '4px' }}
                            label="Info"
                            variant="outlined"
                            fullWidth
                            margin="none"
                            multiline
                            rows={4}
                            name="info"
                            InputLabelProps={{ style: { color: theme.color } }}
                            InputProps={{ style: { color: theme.color } }}
                            value={formik.values.info}
                            onChange={formik.handleChange}
                            error={formik.touched.info && Boolean(formik.errors.info)}
                        />
                        <div style={{ height: '25px' }}>
                            {formik.errors.info && formik.touched.info && (<Typography variant="caption" color="red">{formik.errors.info}</Typography>)}
                        </div>
                        <TextField
                            sx={{ background: theme.inputBackground, borderRadius: '4px' }}
                            label="Trailer URL"
                            variant="outlined"
                            fullWidth
                            margin="none"
                            name="trailer"
                            InputLabelProps={{ style: { color: theme.color } }}
                            InputProps={{ style: { color: theme.color } }}
                            value={formik.values.trailer}
                            onChange={formik.handleChange}
                            error={formik.touched.trailer && Boolean(formik.errors.trailer)}
                        />
                        <div style={{ height: '25px' }}>
                            {formik.errors.trailer && formik.touched.trailer && (<Typography variant="caption" color="red">{formik.errors.trailer}</Typography>)}
                        </div>
                        <TextField
                            sx={{ background: theme.inputBackground, borderRadius: '4px' }}
                            label="Rating"
                            variant="outlined"
                            fullWidth
                            margin="none"
                            name="rating"
                            type="number"
                            InputLabelProps={{ style: { color: theme.color } }}
                            InputProps={{ style: { color: theme.color } }}
                            value={formik.values.rating}
                            onChange={formik.handleChange}
                            error={formik.touched.rating && Boolean(formik.errors.rating)}
                        />
                        <div style={{ height: '25px' }}>
                            {formik.errors.rating && formik.touched.rating && (<Typography variant="caption" color="red">{formik.errors.rating}</Typography>)}
                        </div>
                        <Button className='btn' type="submit" variant="contained" sx={{ background: theme.inputBackground, color: theme.color, float: 'right' }}>
                            Update
                        </Button>
                    </form>
                </Container>
            ) : (
                <LoadingButton />
            )}
        </>

    );
}
