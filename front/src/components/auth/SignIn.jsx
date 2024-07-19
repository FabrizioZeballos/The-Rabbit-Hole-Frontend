import { useState } from "react";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import { FcGoogle } from "react-icons/fc";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        navigate("/catalog");
        setIsSigningIn(false);
      } catch (error) {
        console.log(error.message);
        setIsSigningIn(false);
      }
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithGoogle().catch((err) => {
        setIsSigningIn(false);
        console.log(err);
      });
      console.log("User signed in with Google");

      navigate("/catalog");
      setIsSigningIn(false);
    }
  };

  return (
    <div className={styles["auth-container"]}>
      <form action="" className={styles["auth-form"]}>
        <h2>Log In</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          onClick={onSubmit}
          className={styles["form-submit-button"]}
        >
          Log In
        </button>
        <span>or sign in with Google</span>
        <button
          onClick={onGoogleSignIn}
          className={`${styles["form-submit-button"]} ${styles["google-button"]}`}
        >
          <FcGoogle className={styles["google-icon"]} />
        </button>
      </form>
    </div>
  );
};
