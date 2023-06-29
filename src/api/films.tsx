import api from "./api";
import Film from "../components/Film";
export const getListOfFilms = async () => {
    const response = await api.get('/films');
    return response.data;
};
export const getSearchList = async (search: string) => {
    const response = await api.get<Film[]>('/films', {
        params: {
            title: search,
        }
    });
    return response.data;
};
export const getFilm = async (id: number) => {
    const response = await api.get<Film>(`/films/${id}`);
    return response.data;
};
export const addFilm = async (film: Film) => {
    const response = await api.post('/films', film);
    return response.data;
};
export const updateFilm = async (id: number, film: Film) => {
    const response = await api.put(`/films/${id}`, film);
    return response.data;
};
export const deleteFilm = async (id: number) => {
    const response = await api.delete(`/films/${id}`);
    return response.data;
};