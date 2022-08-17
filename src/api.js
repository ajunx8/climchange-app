import axios from 'axios';

export function callAPI(lat, long) {
    const APIKEY = '25b382e32ccd487eb88549c3ac8a5f7c';
    return axios.create({
        baseURL: `https://api.openweathermap.org/data/3.0/onecall?lat=${ lat }&lon=${ long }&appid=${ APIKEY }`,
    })
}