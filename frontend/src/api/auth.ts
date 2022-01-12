import httpClient from "../http/httpClient";

const authenticate = (username: string, password: string) => {
    return httpClient.post('api/login', {username: username, password: password})
}

export {
    authenticate
}