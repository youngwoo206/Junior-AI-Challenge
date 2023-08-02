import React, { useState, useContext } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { SessionData, NavigationFrom } from "types";
import { Toast, ToastPropsData } from "components";
import { login } from "services";
import { SessionContext } from "contexts";

import styles from "./login.module.css";

export const Login = (): JSX.Element => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [working, setWorking] = useState<boolean>(false);
  const [toastProps, setToastProps] = useState<ToastPropsData | null>(null);
  const session = useContext(SessionContext);
  const location = useLocation();
  const navigate = useNavigate();

  let gotoAfterLogin = "/user";
  let replaceLocationInRouter = false;

  if (
    location.state &&
    NavigationFrom.isInstance(location.state) &&
    location.state.location
  ) {
    gotoAfterLogin =
      location.state.location.pathname +
      location.state.location.search +
      location.state.location.hash;
    replaceLocationInRouter = true;
  }

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
    login(username, password, onSuccess, onError);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topSpacer} />
      <Stack spacing={2} className={styles.contentStack}>
        <Typography variant="h4" align="center">
          Junior AI
        </Typography>
        <Typography variant="h5" align="center">
          Login
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
                Login
              </Button>
            </div>
            <div className={styles.centeredContent}>
              <Typography variant="body1">
                Not a user? Sign up <Link to="/signup">here</Link>
              </Typography>
            </div>
          </Stack>
        </form>
      </Stack>
      {toastProps ? <Toast data={toastProps} /> : null}
    </div>
  );
};
