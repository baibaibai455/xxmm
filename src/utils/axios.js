import baseURL from './URLs';
import axios from 'axios';
import qs from 'qs';


let headerObj = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest'

};


export default function(url = '', data = {}, method = 'get', state = true, header) {


    let dataData = {};
    let paramsData = {};

    if (method == 'get') {

        paramsData = data;
    }
    if (method == 'post') {
        dataData = data;
        dataData = qs.stringify(dataData);
    }


    return axios({
        url: (typeof url) == 'string' ? url : url.url,
        baseURL: (typeof url) == 'string' ? baseURL.baseURL : url.baseURL,
        responseType: 'json',
        data: dataData,
        params: paramsData,
        timeout: 120000,
        headers: headerObj,
        method: method
    });
}

axios.interceptors.response.use(response => {


    return response;
}, error => {


    return Promise.reject(error);
});
