//----------------------------------------------------------------------------------------------------------------------
//Auth reducer
//----------------------------------------------------------------------------------------------------------------------

//Action types

export const GET_TOKEN = "GET_TOKEN";
export const LOGOUT = "LOGOUT";

//Action state types

export interface authSetToken{
    type: typeof GET_TOKEN,
    token: string
}

export interface authLogout{
    type: typeof LOGOUT,
    token: undefined
}

//All action types

export type authStateAction = authSetToken | authLogout;