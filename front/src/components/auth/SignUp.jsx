import { useState } from "react";
import {
  doCreateUserWithEmailAndPassword,
  doSendEmailVerfication,
} from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        const { user } = await doCreateUserWithEmailAndPassword(
          email,
          password
        );
        console.log("This is the user", user);
        console.log("User signed up");
        await doSendEmailVerfication(user);
        console.log("Email verification already sent");
        navigate("/catalog");
        setIsRegistering(false);
      } catch (error) {
        console.log(error.message);
        setIsRegistering(false);
      }
    }
  };

  return (
    <div className={styles["auth-container"]}>
      <form action="" className={styles["auth-form"]}>
        <h2>Sign Up</h2>
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
          Sign Up
        </button>
      </form>
    </div>
  );
};
