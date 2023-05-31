import {API_URL, API_KEY} from "@/fetches/config";
import {yieldPromiseDataModel} from "@/helpers";
import {FetchGetHeader} from "@/fetches";

export const searchMovie = (params: any) => {
    return new Promise((resolve, reject) => {
        FetchGetHeader(`${API_URL}?apiKey=${API_KEY}`, params, data => {
            yieldPromiseDataModel(data, resolve, reject);
        })
    });
}

export const detailMovie = (params: any) => {
    return new Promise((resolve, reject) => {
        FetchGetHeader(`${API_URL}?apiKey=${API_KEY}`, params, data => {
            yieldPromiseDataModel(data, resolve, reject);
        })
    });
}
