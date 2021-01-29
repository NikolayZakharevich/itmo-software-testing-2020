import React, {useState} from 'react';
import {doLogin, doRegister} from "../../api/auth";

export const AuthPage = ({isLogin, onSuccess, onFailure}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const onChangeLogin = e => setLogin(e.target.value)
    const onChangePassword = e => setPassword(e.target.value)
    const onSubmit = event => {
        event.preventDefault();
        const params = {login, password};
        const promise = isLogin ? doLogin(params) : doRegister(params);
        promise.then(onSuccess).catch(onFailure)
    }

    return (
        <form id="authForm" onSubmit={onSubmit}>
            <h1>{isLogin ? "Login" : "Register"} Below!</h1>
            <input
                type="login"
                name="login"
                placeholder="Enter login"
                value={login}
                onChange={onChangeLogin}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={onChangePassword}
                required
            />
            <input type="submit" value="Submit"/>
        </form>
    );
}

export default AuthPage