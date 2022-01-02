import { SET_SETTINGS } from "../constants/settingsConstants";

export const settingsReducer = (state = { settings: {}}, action) => {
    switch(action.type){
        case SET_SETTINGS:
            return {
                ...state,
                settings : action.payload
            }
       
        default :
            return state
    }
}