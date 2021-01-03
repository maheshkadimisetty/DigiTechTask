import axois from 'axios';

let lambdaUrl = 'https://jsonplaceholder.typicode.com/';
const httpClient = axois.create({
    lambdaUrl,
    timeout: 5000
});

httpClient.interceptors.request.use(
    config => {
        let token = 'bearer 7588'
        if (token) {
            config.headers.common.Authorization = token;

        }
        return config;
    }
);
httpClient.interceptors.response.use(
    response => {
        const res = response.data;
        if (response.status !== 200) {
            return Promise.reject(new Error(res.message || 'error'));
        } else {
            return res;
        }
    },
    error => {
        console.log('err' + error);
        return Promise.reject(error);
    }
);

export default httpClient;