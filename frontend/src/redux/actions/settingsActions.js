import axios from 'axios';
import { GET_SETTINGS_REQUEST,
    GET_SETTINGS_SUCCESS,
    GET_SETTINGS_FAIL,
    UPDATE_SETTINGS_REQUEST,
    UPDATE_SETTINGS_SUCCESS,
    UPDATE_SETTINGS_FAIL } from "../constants/settingsConstants";

export const getSettings = () => async (dispatch) => {

    try {
        dispatch({type: GET_SETTINGS_REQUEST});

        const {data} = await axios.get(`/api/v1/orderSettings`);

        dispatch({
            type: GET_SETTINGS_SUCCESS,
            payload: data.settingsInfo[0]
        })
        
    } catch (error) {
        dispatch({
            type: GET_SETTINGS_FAIL,
            payload: error.response.data.message
        })
    }
};


export const updateSettings = (settingsData) => async (dispatch) => {

    try {
        dispatch({type: UPDATE_SETTINGS_REQUEST});

        const config = {
            headers: {
                "content-type" : "application/json"
            }
        }

        const {data} = await axios.patch(`/api/v1/orderSettings`, settingsData, config);
        console.log(data)

        dispatch({
            type: UPDATE_SETTINGS_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {
        dispatch({
            type: UPDATE_SETTINGS_FAIL,
            payload: error.response.data.message
        })
    }
};