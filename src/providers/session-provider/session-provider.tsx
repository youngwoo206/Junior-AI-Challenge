import React, { useState } from "react";
import { SessionData, SessionContextContent } from "types";
import { SessionContext } from "contexts";

export const SessionProvider = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const [sessionData, setSessionData] = useState<SessionData | null>(null);

    const updateSessionData = (sessionData: SessionData | null): void => {
        setSessionData(sessionData);
    };

    const value: SessionContextContent = {
        sessionData,
        updateSessionData,
    };

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
};
