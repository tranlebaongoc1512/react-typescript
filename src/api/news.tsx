import api from "./api";

export const getListOfNews = async () => {
    const response = await api.get('/news');
    return response.data;
};