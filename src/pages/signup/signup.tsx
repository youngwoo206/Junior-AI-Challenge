import React, { useState, useContext } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { signup } from "services/signup";
import { Toast, ToastPropsData } from "components";
import { SessionData, NavigationFrom } from "types";
import { SessionContext } from "contexts";

import styles from "./signup.module.css";

export const Signup = (): JSX.Element => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [verifyPasswordError, setVerifyPasswordError] = useState<string>("");
  const [working, setWorking] = useState<boolean>(false);
  const [toastProps, setToastProps] = useState<ToastPropsData | null>(null);

  const session = useContext(SessionContext);
  const navigate = useNavigate();

  let gotoAfterLogin = "/user";
  let replaceLocationInRouter = false;

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!username) {
      setUsernameError("Username is required");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    if (!verifyPassword) {
      setVerifyPasswordError("Verify password is required");
      return;
    }
    if (password !== verifyPassword) {
      setPasswordError("Passwords do not match");
      setVerifyPasswordError("Passwords do not match");
    }

    setWorking(true);

    const onSuccess = (sessionData: SessionData): void => {
      setWorking(false);
      session.updateSessionData(sessionData);
      navigate(gotoAfterLogin, { replace: replaceLocationInRouter });
    };

    const onError = (error: string): void => {
      setWorking(false);
      setToastProps({
        severity: "error",
        message: error,
        closeToast: () => {
          setToastProps(null);
        },
      });
    };
    signup(username, password, onSuccess, onError);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topSpacer} />
      <Stack spacing={2} className={styles.contentStack}>
        <Typography variant="h4" align="center">
          Junior AI
        </Typography>
        <Typography variant="h5" align="center">
          Signup
        </Typography>
        <form onSubmit={onSubmit}>
          <Stack spacing={1}>
            <TextField
              value={username}
              label="Username *"
              error={usernameError ? true : false}
              helperText={usernameError ?? " "}
              InputProps={{
                readOnly: working,
              }}
              autoFocus
              onChange={(event) => {
                setUsername(event.target.value);
                setUsernameError("");
              }}
            />
            <TextField
              type="password"
              value={password}
              label="Password *"
              error={passwordError ? true : false}
              helperText={passwordError ?? " "}
              InputProps={{
                readOnly: working,
              }}
              onChange={(event) => {
                setPassword(event.target.value);
                setPasswordError("");
              }}
            />
            <TextField
              type="password"
              value={verifyPassword}
              label="Verify Password *"
              error={verifyPasswordError ? true : false}
              helperText={verifyPasswordError ?? " "}
              InputProps={{
                readOnly: working,
              }}
              onChange={(event) => {
                setVerifyPassword(event.target.value);
                setVerifyPasswordError("");
              }}
            />

            <div className={styles.centeredContent}>
              <Button
                color="secondary"
                variant="contained"
                type="submit"
                fullWidth={false}
                size="medium"
                disabled={working}
              >
                Signup
              </Button>
            </div>
            <div className={styles.centeredContent}>
              <Typography variant="body1">
                Have an account? Login{" "}
                <Link to="/" className={styles.link}>
                  here
                </Link>
              </Typography>
            </div>
          </Stack>
        </form>
      </Stack>
      {toastProps ? <Toast data={toastProps} /> : null}
    </div>
  );
};
