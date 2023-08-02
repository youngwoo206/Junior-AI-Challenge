import React, { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { RequireSession } from "components";
import { SessionContext } from "contexts";
import { userUpdate } from "services";
import { Toast, ToastPropsData } from "components";

import styles from "./settings.module.css";
import { SessionData } from "types";
import { Backdrop, CircularProgress } from "@mui/material";

//Interview task by Youngwoo Lee, hopefully everything looks good!
export const Settings = (): JSX.Element => {
  const session = useContext(SessionContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");

  const [working, setWorking] = useState<boolean>(false);
  const [toastProps, setToastProps] = useState<ToastPropsData | null>(null);

  const username = session.sessionData?.username;

  const onNameSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!firstName) {
      //if firstName is left blank, checks to see if lastName is also blank.
      //if so, sets error state for both fields.
      if (!lastName) {
        setFirstNameError("First name is required");
        setLastNameError("Last name is required");
        return;
      } else {
        setFirstNameError("First name is required");
        return;
      }
    }

    if (!lastName) {
      setLastNameError("Last name is required");
      return;
    }

    if (!username) {
      return;
    }

    setWorking(true);

    //on success, resets all states and navigates user to home page
    const onSuccess = (sessionData: SessionData) => {
      setWorking(false);
      setFirstName("");
      setLastName("");
      //user.ts service function was also edited to that session data is updated on success
      session.updateSessionData(sessionData);
      navigate("/user");
    };

    //on error, first and last name inputs are not reset so user can quickly retry
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

    userUpdate(username, firstName, lastName, onSuccess, onError);
  };

  return (
    <RequireSession>
      <div className={styles.container}>
        <div className={styles.topSpacer} />
        <Stack spacing={2} className={styles.contentStack}>
          <div className={styles.centeredContent}>
            <Button
              fullWidth={false}
              size="medium"
              onClick={() => {
                navigate("/user");
              }}
            >
              Back
            </Button>
          </div>
          <Typography variant="h4" align="center">
            Settings
          </Typography>

          <div>
            <div className={styles.formDiv}>
              <form onSubmit={onNameSubmit}>
                <div className={styles.formSection}>
                  <Typography variant="body1" className={styles.formLabel}>
                    First Name:
                  </Typography>
                  <TextField
                    value={firstName}
                    label="Enter First Name"
                    error={firstNameError ? true : false}
                    helperText={firstNameError ?? " "}
                    InputProps={{
                      readOnly: working,
                    }}
                    onChange={(event) => {
                      setFirstName(event.target.value);
                    }}
                    onClick={() => {
                      setFirstNameError("");
                    }}
                  />
                </div>
                <div className={styles.formSection}>
                  <Typography variant="body1" className={styles.formLabel}>
                    Last Name:
                  </Typography>
                  <TextField
                    value={lastName}
                    label="Enter Last Name"
                    error={lastNameError ? true : false}
                    helperText={lastNameError ?? " "}
                    InputProps={{
                      readOnly: working,
                    }}
                    onChange={(event) => {
                      setLastName(event.target.value);
                    }}
                    onClick={() => {
                      setLastNameError("");
                    }}
                  />
                </div>
                <div className={styles.centeredContent}>
                  <Button
                    color="secondary"
                    variant="contained"
                    type="submit"
                    fullWidth={false}
                    size="medium"
                    disabled={working}
                  >
                    Submit Changes
                  </Button>
                </div>
              </form>
            </div>
            {toastProps ? <Toast data={toastProps} /> : null}
          </div>
        </Stack>
        {/* Spinner added to indicate to user that their input has been registered */}
        <Backdrop
          open={working}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </RequireSession>
  );
};
export default Settings;
