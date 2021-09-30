import axios from 'axios'

// const Host = "https://gis.uestc.edu.cn/"
const service = axios.create({
    baseURL: CONFIG_HOST, // api的base_url
    timeout: 500000 // request timeout
})

service.interceptors.request.use(
    async config => {
        return config
    }, error => {
        Promise.reject(error)
    })

service.interceptors.response.use(
    response => {
        return Promise.resolve(response.data);
        if (response.status === 200) {
            return Promise.resolve(response.data);
        } else {
            return Promise.reject(response.data);
        }

    },
    async error => {
        return Promise.reject(error);
    })


function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        service({
                url,
                method: 'get',
                params
            })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
}
export function post(url, { params = {}, data = {} }) {
    return new Promise((resolve, reject) => {
        service({
                url,
                method: 'post',
                data,
                params
            })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
}


export default {
    get,
    post
};