import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login as loginAction, logout as logoutAction} from '../store/actions/auth'
import {RootState} from "../store";
import {GET_TOKEN} from "../store/defenitions/action-types";

const useAuth = () => {
    const auth = useSelector((state: RootState) => state.auth);

    const [logedin, setLogedin] = useState<boolean>()

    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token)
            dispatch({ type: GET_TOKEN, token: token });
    }, []);

    const login = (username: string, password: string) => {
        dispatch(loginAction(username, password))
    }

    const logout = () => {
        dispatch(logoutAction());
    }

    return {
        login,
        logout,
        token: auth.token,
        logedin: auth.token && auth.token.length > 0 || false
    };

}

export default useAuth;