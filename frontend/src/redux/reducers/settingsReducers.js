import { GET_SETTINGS, SET_SETTINGS } from "../constants/settingsConstants";

export const settingsReducer = (state = { settings: {}}, action) => {
    switch(action.type){
        case GET_SETTINGS:
        case SET_SETTINGS:
            return {
                ...state,
                settings : action.payload
            }
        
        default :
            return state
    }
}