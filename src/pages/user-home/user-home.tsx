import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { RequireSession } from "components";
import { SessionContext } from "contexts";

import styles from "./user-home.module.css";

export const UserHome = (): JSX.Element => {
  const session = useContext(SessionContext);
  const navigate = useNavigate();

  return (
    <RequireSession>
      <div className={styles.container}>
        <div className={styles.topSpacer} />
        <Stack spacing={2} className={styles.contentStack}>
          <Typography variant="h4" align="center">
            Junior AI - User Home Page
          </Typography>
          <Typography variant="h5" align="center">
            Welcome
            {` ${session.sessionData?.userFirstName} ${session.sessionData?.userLastName}`}
          </Typography>
          <div className={styles.centeredContent}>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              fullWidth={false}
              size="medium"
              onClick={() => {
                navigate("/session-info");
              }}
            >
              Session Info
            </Button>
          </div>
          <div className={styles.centeredContent}>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              fullWidth={false}
              size="medium"
              onClick={() => {
                navigate("/settings");
              }}
            >
              Settings
            </Button>
          </div>
          <div className={styles.centeredContent}>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              fullWidth={false}
              size="medium"
              onClick={() => {
                session.updateSessionData(null);
                navigate("/");
              }}
            >
              Logout
            </Button>
          </div>
        </Stack>
      </div>
    </RequireSession>
  );
};
