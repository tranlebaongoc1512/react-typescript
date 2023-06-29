import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Film from "../../components/Film";

interface FilmState {
    draftFilm: Film | null;
}

const initialState: FilmState = {
    draftFilm: null,
}

const filmSlice = createSlice({
    name: 'film',
    initialState: initialState,
    reducers: {
        saveFilm: (state, action: PayloadAction<FilmState['draftFilm']>) => {
            state.draftFilm = action.payload;
        },
        clearFilm: (state) => {
            state.draftFilm = null;
        }
    },
});

export const { saveFilm, clearFilm } = filmSlice.actions;

export default filmSlice;