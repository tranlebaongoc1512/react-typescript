import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addFilm } from '../api/films';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import useDocumentTitle from './hooks/useDocumentTitle';
import { saveFilm, clearFilm } from '../store/features/filmSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import Film from './Film';
import useTheme from './hooks/useTheme';

export default function AddFilm() {
  useDocumentTitle("Add Film");
  const { theme } = useTheme();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  let film: Film = {
    image: "",
    title: "",
    year: currentYear,
    nation: "",
    banner: "",
    info: "",
    trailer: "",
    rating: 0,
  };

  const dispatch = useAppDispatch();
  const filmDraft = useAppSelector(state => state.film.draftFilm);
  if (filmDraft) {
    film = filmDraft;
  }
  const handleSaveFilm = () => {
    const newFilm = formik.values;
    dispatch(saveFilm(newFilm));
    Swal.fire({
      icon: 'success',
      title: 'Save as draft successfully',
      text: 'Draft data will be lost if you refresh the page',
      showConfirmButton: true,
      background: theme.cardBackground,
      color: theme.color,
    });
  };

  const handleClearFilm = () => {
    dispatch(clearFilm());
  };

  const formik = useFormik({
    initialValues: film,
    onSubmit: async values => {
      let trailer = values.trailer;
      if (trailer) {
        if (trailer.includes("youtu.be/")) {
          trailer = trailer.split("/").pop();
        } else if (trailer.includes("youtube.com/watch?v=")) {
          trailer = trailer.split("=").pop();
        }
      }
      await addFilm({ image: values.image, title: values.title, year: values.year, nation: values.nation, banner: values.banner, info: values.info, trailer: trailer, rating: values.rating });
      handleClearFilm();
      Swal.fire({
        icon: 'success',
        title: 'Film add successfully',
        showConfirmButton: false,
        timer: 1500,
        background: theme.cardBackground,
        color: theme.color,
      });
      navigate('/');
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
    <Container maxWidth="md" className='component-container' sx={{ paddingBottom: '60px' }}>
      <Typography variant="h4" gutterBottom>Add Film</Typography>
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
          Add
        </Button>
        <Button className='btn' onClick={handleSaveFilm} variant="contained" sx={{ background: theme.inputBackground, color: theme.color, float: 'right', marginRight: '10px' }}>
          Save as draft
        </Button>
      </form>
    </Container>
  );
}
