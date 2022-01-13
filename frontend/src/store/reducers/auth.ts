import {authState} from "../defenitions/store-types";
import {authStateAction, GET_TOKEN, LOGOUT} from "../defenitions/action-types";

export const auth = (state: authState = {}, action: authStateAction): authState => {
    switch (action.type) {
        case LOGOUT:
        case GET_TOKEN:
            return { ...state , ...action };
        default:
            return state;
    }
};
