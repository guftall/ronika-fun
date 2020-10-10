import axios from 'axios';
import { default as config } from '../../config';

const URL = config.ApiUrl
class Api {
    token() {
        return localStorage.getItem('myToken-Admin')
    }
    login(data) {
        return axios.post(`${URL}/api/account/auth/login?userType=1`, data)
    }
}

export const api = new Api()
