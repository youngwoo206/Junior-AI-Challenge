import { SessionData } from "types";

export const signup = (
    username: string,
    password: string,
    onSuccess: (sessionData: SessionData) => void,
    onError: (error: string) => void
) => {
    const minDelayMS = 1000;
    const maxDelayMS = 4000;

    const delay =
        Math.floor(Math.random() * (maxDelayMS - minDelayMS + 1)) + minDelayMS;
    
    if (localStorage.getItem(username) !== null) {
        setTimeout(() => {
            onError("Username already taken!")
        }, delay)
    }
    else {
        if (Math.floor(Math.random() * 4) === 0) {
            setTimeout(() => {
                onError("Error making API call");
            }, delay);
        }
        else {
            const sessionId = Math.floor(100000 + Math.random() * 900000)
            //generates random 6 digit number

            const userData = {
                sessionId,
                username,
                password,
                userFirstName: "First",
                userLastName: "Last"
            }
            localStorage.setItem(username, JSON.stringify(userData))
            setTimeout(() => {
                onSuccess(userData)
            })
        }
    }
}