import {AppDispatch, AppThunk} from "../index";
import {authenticate} from "../../api/auth";
import {AxiosResponse} from "axios";
import {GET_TOKEN, LOGOUT} from "../defenitions/action-types";

const login = (username: string, password: string): AppThunk => (dispatch: AppDispatch) => {
    authenticate(username, password).then((response: AxiosResponse) => {
        localStorage.setItem("token", response.data.token)
        dispatch({ type: GET_TOKEN, token: response.data.token });
    })
}

const logout = (): AppThunk => (dispatch: AppDispatch) => {
    localStorage.removeItem("token");
    dispatch({type: LOGOUT})
}

export {
    login,
    logout
}