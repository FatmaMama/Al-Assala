import axios from "axios";
export default axios.create({baseURL: process.env.REACT_APP_API_URL,
    // headers: {
    //     "Access-Control-Allow-Origin" : "*",
    //     "Access-Control-Allow-Methods": 'HEAD, GET, POST, PUT, PATCH, DELETE',
    //     "Access-Control-Allow-Headers": 'Origin, Content-Type, X-Auth-Token'
    //   }
    });