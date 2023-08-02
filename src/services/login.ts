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

    if (localStorage.getItem(username) == null) {
        setTimeout(() => {
            onError("Username not found!")
        }, delay)
    }
    
    else {
        if (Math.floor(Math.random() * 4) === 0) {
            // Just for fun, we'll have the call fail for an unknown reason
            // some of the time.
            setTimeout(() => {
                onError("Error making API call");
            }, delay);
        } else {
            const user = localStorage.getItem(username)
            if (!user) {
                return
            }
            const sessionData = JSON.parse(user)
            if (password !== sessionData.password) {
                setTimeout(() => {
                    onError("Password not correct!")
                }, delay)
            }
            else {
                setTimeout(() => {
                    onSuccess(sessionData);
                }, delay);
            }
        }
    }
};
