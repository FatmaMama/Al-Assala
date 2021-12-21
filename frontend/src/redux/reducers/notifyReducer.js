import { NOTIFY_USER } from '../constants/notifyConstants';

const initialState = {
    message : null,
    messageType : null
}

export const notifyReducer = (state = initialState, action) => {
    switch(action.type) {
        case NOTIFY_USER :
            return {
                ...state,
                message : action.message,
                messageType : action.messageType
            }
        default :
            return state

    }
}