import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <div className={styles["home-container"]}>
      <h1 className={styles.title}>Home</h1>
      <div>
        <Link to={"/signup"} className={styles.link}>
          Sign Up
        </Link>
      </div>
      <div>
        <Link to={"/signin"} className={styles.link}>
          Sign In
        </Link>
      </div>
    </div>
  );
};
