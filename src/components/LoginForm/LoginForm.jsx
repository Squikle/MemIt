import classname from "classname";
import styles from "./LoginForm.module.css";
import { useRef, useState } from "react";
import { login, registration } from "../../http/userAPI";
import { useAuthContext } from "../../contexts/AuthContext/useAuthContext";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const [isLogin, setIsLogin] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (isLogin) {
      const data = await login(email, password);
      authContext.login(data.token);
      navigate("/");
      return;
    }

    const data = await registration(email, password);
    authContext.login(data.token);
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h1>{header}</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputs}>
          <div className={classname(styles.input, styles.email)}>
            <input type="email" ref={emailRef}></input>
          </div>
          <div className={classname(styles.input, styles.password)}>
            <input type="password" ref={passwordRef}></input>
          </div>
        </div>
        <button>{buttonText}</button>
        {toggler}
      </form>
    </div>
  );
}

LoginForm.propTypes = {};
