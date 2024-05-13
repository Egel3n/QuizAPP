import { redirect } from "react-router-dom";
import axios from "./api/axios";

const Logout = () => {
  try {
    axios.get("/logout", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
  return (
    <section>
      <h1>You are logged out!</h1>
      <br />
      <p>
        <a href="/login">Go to Login</a>
      </p>
    </section>
  );
};

export default Logout;
