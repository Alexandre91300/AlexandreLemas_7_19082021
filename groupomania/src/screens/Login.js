import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Link, useHistory } from "react-router-dom";
import { login } from "../api/User";
import { sqlInjectionFilter } from "../utils/SqlInjectionFilter";

const Login = () => {
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let token = localStorage.getItem("token");
        let uid = localStorage.getItem("id");
        if (token && uid) {
            history.push("/");
        }
    }, []);

    const submit = () => {
        login(email, password)
            .then(() => history.push("/"))
            .catch(err => setErrorMessage(err))
    };

    return (
        <>
            <Header type="login" />
            <section className="login">
                <h1 className="login__title">
                    CONNEXION
                </h1>

                <form
                    className="login__form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        submit();
                    }}
                >
                    {errorMessage.length !== 0 ? (
                        <span className="signup__form__error">{errorMessage}</span>
                    ) : null}
                    <input
                        tabIndex='1'
                        placeholder="E-mail"
                        value={email}
                        className="login__form__inp"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        tabIndex='2'
                        placeholder="Mot de passe"
                        value={password}
                        className="login__form__inp"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Link
                        tabIndex='3'
                        to="/signup"
                        className="login__form__link">
                        <p>Pas encore inscrit ? Créez un compte ICI !</p>
                    </Link>

                    {email.length !== 0 && password.length >= 8 && sqlInjectionFilter(email) && sqlInjectionFilter(password) ? (
                        <button
                            tabIndex='4'
                            className="login__form__btn"
                            type="submit"
                        >
                            Connexion
                        </button>
                    ) : (
                        <button
                            className="login__form__btn--disabled"
                            disabled={true}
                            type="submit"
                        >
                            Connexion
                        </button>
                    )}
                </form>
            </section>
        </>
    );
};

export default Login;
