import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login as loginAction} from '../store/actions/auth'
import {RootState} from "../store";
import {GET_TOKEN} from "../store/defenitions/action-types";

const useAuth = () => {
    const auth = useSelector((state: RootState) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token)
            dispatch({ type: GET_TOKEN, token: token });
    }, []);

    const login = async (username: string, password: string) => {
        dispatch(loginAction(username, password))
    }

    return {
        login,
        token: auth.token
    };

}

export default useAuth;