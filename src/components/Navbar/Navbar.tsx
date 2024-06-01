import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import classNames from "classnames";
import { useAuthContext } from "../../contexts/AuthContext/useAuthContext.ts";

export function Navbar() {
  const setActiveClass = ({ isActive }) =>
    classNames(styles.link, { [styles.active]: isActive });
  const authContext = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    authContext.logout();
    navigate("/login");
  };

  const authLinks = (
    <>
      <li>
        <NavLink to="/" className={setActiveClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/profile" className={setActiveClass}>
          Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="/sets" className={setActiveClass}>
          Sets
        </NavLink>
      </li>
      <li>
        <a className={styles.logout} onClick={logout}>
          Logout
        </a>
      </li>
    </>
  );

  return (
    <>
      <div className={styles.backShadow}></div>
      <div className={styles.frontShadow}></div>
      <header>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.headerContentLogo}>
            <p>MemIt</p>
          </Link>

          <nav className={styles.headerContentNav}>
            <ul>{authContext.authorized && authLinks}</ul>
          </nav>
        </div>
      </header>
    </>
  );
}
