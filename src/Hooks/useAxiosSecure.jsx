
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
// import PropTypes from 'prop-types';
const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error){
        //do something with request error
        return Promise.reject(error);
    })

    //interceptors 401 and 403 status
    axiosSecure.interceptors.response.use(function(response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        // for 401 or 403 logOut the user and move to the user in the login page
        if( status === 401 || status === 403 ) {
            await logOut();
            navigate('/login')
        }
        return Promise.reject(error)
    })

    return axiosSecure
};

useAxiosSecure.propTypes = {
    
};

export default useAxiosSecure;