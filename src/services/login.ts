import { SessionData } from "types";

export const login = (
    username: string,
    password: string,
    onSuccess: (sessionData: SessionData) => void,
    onError: (error: string) => void
) => {
    // Normally we would make an API to login here.  In order to keep
    // things simple, we'll fake it.  We'll throw in a random delay in
    // order to simulate latency that would be expected when making an
    // API call.

    const minDelayMS = 1000;
    const maxDelayMS = 4000;

    const delay =
        Math.floor(Math.random() * (maxDelayMS - minDelayMS + 1)) + minDelayMS;

    if (username !== "user" || password !== "password") {
        setTimeout(() => {
            onError("Invalid username or password");
        }, delay);
    } else {
        if (Math.floor(Math.random() * 4) === 0) {
            // Just for fun, we'll have the call fail for an unknown reason
            // some of the time.
            setTimeout(() => {
                onError("Error making API call");
            }, delay);
        } else {
            const firstName = localStorage.getItem("firstName") || "First";
            const lastName = localStorage.getItem("lastName") || "Last";
            const sessionData: SessionData = {
                sessionId: 1,
                username: "user",
                userFirstName: firstName,
                userLastName: lastName,
            };
            setTimeout(() => {
                onSuccess(sessionData);
            }, delay);
        }
    }
};
