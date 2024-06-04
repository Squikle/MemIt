import classNames from "classnames";
import styles from "./LoginForm.module.scss";
import {FormEvent, useRef, useState} from "react";
import { login, registration } from "@/api/authApi.ts";
import { useAuthContext } from "../../contexts/AuthContext/useAuthContext.ts";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const authContext = useAuthContext();
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  const header = isLogin ? "Login to your account" : "Register new user";
  const toggler = isLogin ? (
    <p>
      Don&apos;t have an account yet? <a onClick={toggleForm}>Register</a>
    </p>
  ) : (
    <p>
      Already have an account? <a onClick={toggleForm}>Login</a>
    </p>
  );
  const buttonText = isLogin ? "Login" : "Register";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

    let token;
    if (isLogin) {
      token = await login(email, password);
    } else {
      token = await registration(email, password);
    }

    if (!token)
      throw new Error("token must be not empty!");

    authContext.login(token);
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h1>{header}</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputs}>
          <div className={classNames(styles.input, styles.email)}>
            <input type="email" ref={emailRef}></input>
          </div>
          <div className={classNames(styles.input, styles.password)}>
            <input type="password" ref={passwordRef}></input>
          </div>
        </div>
        <button>{buttonText}</button>
        {toggler}
      </form>
    </div>
  );
}
