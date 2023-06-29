import { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import { CardContent, CardMedia, Grid, Typography, Container, Pagination } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Film from './Film';
import useTheme from './hooks/useTheme';

interface FilmsPresentationProps {
    films: Film[];
}
export default function FilmsPresentation({ films }: FilmsPresentationProps) {
    const { theme } = useTheme();
    const itemsPerPage = 6;
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, films.length);
    const currentFilms = films.slice(startIndex, endIndex);
    const totalPages = Math.ceil(films.length / itemsPerPage);
    useEffect(() => {
        setCurrentPage(1);
    }, [films])
    return (
        <Container maxWidth='xl' className='component-container'>
            <Typography variant="h4" gutterBottom>Trendy Movie</Typography>
            <Grid container spacing={2}>
                {films.length !== 0 ? (
                    <>
                        {
                            currentFilms.map(film => {
                                return (
                                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={film.id} sx={{ textAlign: 'center' }}>
                                        <Card sx={{ background: theme.cardBackground, color: 'inherit' }}>
                                            <CardActionArea onClick={() => navigate(`detail/${film.id}`)}>
                                                <CardMedia
                                                    className="card-media"
                                                    component="img"
                                                    image={film.image}
                                                    alt={film.title}
                                                    sx={{ height: '500px' }}
                                                />
                                                <CardContent>
                                                    <Typography variant='h5' sx={{ fontSize: '18px', height: '70px', textAlign: 'left' }}>
                                                        {film.title}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                )
                            })
                        }
                    </>
                ) : (
                    <div className='not-found'>
                        <Typography variant='h5' >No results found!</Typography>
                    </div>
                )}
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination className='pagination' variant='outlined' count={totalPages} page={currentPage} onChange={(e, page) => { setCurrentPage(page) }} />
                </Grid>
            </Grid>
        </Container>
    )
}
