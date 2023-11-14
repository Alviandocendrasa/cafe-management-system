import axios from "axios";

// set axios default request header
export const setTokenHeader = token => {
    if(token){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export const apiCall = (method, path, data) => {
    return new Promise((resolve, reject) => {
        return axios[method](`${process.env.REACT_APP_API_URL}${path}`, data)
        .then(res => {
            return resolve(res.data);
        })
        .catch(err => {
            return reject(err.response.data);
        })
    })
}