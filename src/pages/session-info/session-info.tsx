import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { RequireSession } from "components";
import { SessionContext } from "contexts";

import styles from "./session-info.module.css";

export const SessionInfo = (): JSX.Element => {
    const session = useContext(SessionContext);
    const navigate = useNavigate();

    return (
        <RequireSession>
            <div className={styles.container}>
                <div className={styles.topSpacer} />
                <Stack spacing={2} className={styles.contentStack}>
                    <Typography variant="h4" align="center">
                        Session Info
                    </Typography>
                    <Typography variant="h5" align="center">
                        Session Id: {session.sessionData?.sessionId}
                    </Typography>
                    <Typography variant="h5" align="center">
                        Username: {session.sessionData?.username}
                    </Typography>
                    <div className={styles.centeredContent}>
                        <Button
                            color="secondary"
                            variant="contained"
                            type="submit"
                            fullWidth={false}
                            size="medium"
                            onClick={() => {
                                navigate("/user");
                            }}
                        >
                            Close
                        </Button>
                    </div>
                </Stack>
            </div>
        </RequireSession>
    );
};
