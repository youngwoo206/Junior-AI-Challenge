import { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { NavigationFrom } from "types";
import { SessionContext } from "contexts";

export const RequireSession = ({
    children,
}: {
    children: JSX.Element;
}): JSX.Element => {
    const location = useLocation();
    const session = useContext(SessionContext);

    if (!session.sessionData) {
        return <Navigate to="/" replace state={new NavigationFrom(location)} />;
    }

    return children;
};
