import React, { useRef, useState } from "react";
import { signInUserAction, signUpUserAction } from "../../redux/auth-actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";

import classes from "./Auth.module.css";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ref is sufficient since we don't really need any re-rendering
  const emailRef = useRef();
  const passwordRef = useRef();

  // to switch between login/sign-up, default: login
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    // can get these values from event parameter as well :)
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setIsLoading(true);
    try {
      if (isLogin) {
        await dispatch(signInUserAction(email, password));
      } else {
        // role is hard-coded (as "user") for now as only a user can sign up, not admin or editor
        await dispatch(signUpUserAction(email, password, "user"));
      }

      navigate("/products");
    } catch (err) {
      toast.error(err.message);
    }

    setIsLoading(false);
  };

  return (
    <main className={classes.auth}>
      <section>
        <Typography variant="h4" component="h1">
          {isLogin ? "Log In" : "Sign Up"}
        </Typography>

        <form className={classes["auth-form"]} onSubmit={formSubmitHandler}>
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            type="email"
            inputRef={emailRef}
            required
          />
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            type="password"
            inputRef={passwordRef}
            required
          />

          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? "Loading " : isLogin ? "Log In" : "Sign Up"}
            {isLoading && (
              <CircularProgress sx={{ marginLeft: "1rem" }} size={20} />
            )}
          </Button>
        </form>

        <aside onClick={() => setIsLogin((prevState) => !prevState)}>
          {isLogin
            ? "Don't have an account? Sign Up!"
            : "Already have an account? Log In!"}
        </aside>
      </section>
    </main>
  );
};

export default Auth;
