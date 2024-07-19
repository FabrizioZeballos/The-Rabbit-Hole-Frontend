import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext/useAuth";
import {
  doSendPasswordResetEmail,
  doSignOut,
  doVerifyBeforeUpdateEmail,
} from "../../firebase/auth";
import { useState } from "react";

export const Catalog = () => {
  const { currentUser } = useAuth();
  const [newEmail, setNewEmail] = useState("");
  const navigate = useNavigate();

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const signOut = async (e) => {
    console.log(currentUser);
    e.preventDefault();
    doSignOut().then(() => {
      navigate("/signin");
    });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await doSendPasswordResetEmail(currentUser.email);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    try {
      await doVerifyBeforeUpdateEmail(currentUser, newEmail);
      console.log("Email sent");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        Private Route. Hello,
        {currentUser.displayName ? currentUser.displayName : currentUser.email}
      </div>
      <form action="">
        <input
          type="email"
          placeholder="Enter new email address"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        ></input>
        <button type="submit" onClick={handleUpdateEmail}>
          Update Email Address
        </button>
      </form>
      <button onClick={handleResetPassword}>Reset Password</button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};
