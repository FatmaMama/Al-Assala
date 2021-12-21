import { NOTIFY_USER } from '../constants/notifyConstants';

export const notifyUser = (message, messageType) => (dispatch) => {
    dispatch({
        type: NOTIFY_USER,
        message,
        messageType
    })
}