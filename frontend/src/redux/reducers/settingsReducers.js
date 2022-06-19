import { GET_SETTINGS_REQUEST,
    GET_SETTINGS_SUCCESS,
    GET_SETTINGS_FAIL,
    UPDATE_SETTINGS_REQUEST,
    UPDATE_SETTINGS_SUCCESS,
    UPDATE_SETTINGS_FAIL,
    UPDATE_SETTINGS_RESET
    } from "../constants/settingsConstants";

export const settingsReducer = (state = { settings: []}, action) => {
    switch(action.type){
        case GET_SETTINGS_REQUEST:
            return {
                loading: true,
                settings : []
            }
        case GET_SETTINGS_SUCCESS:
            return {
                loading: false,
                settings: action.payload
            }
    
        case GET_SETTINGS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        
        default :
            return state
    }
}


export const updateSettingsReducer = (state= { }, action) => {
    switch (action.type) {
        case UPDATE_SETTINGS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_SETTINGS_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case UPDATE_SETTINGS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_SETTINGS_RESET:
            return {
                ...state,
                isUpdated: false
            }

        default:
            return state
    }
}