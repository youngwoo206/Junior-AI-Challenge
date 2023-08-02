import { SessionData } from "types";

export const userUpdate = (
    username: string,
    newFirstName: string,
    newLastName: string,
    onSuccess: (sessionData: SessionData) => void,
    onError: (error: string) => void
): void => {
    // Explanation for why we're doing things this way can be found in comments
    // in login.ts

    const minDelayMS = 1000;
    const maxDelayMS = 4000;

    const delay =
        Math.floor(Math.random() * (maxDelayMS - minDelayMS + 1)) + minDelayMS;

    let errorMessage = "";

    if (!username) {
        errorMessage = "cannot find user"
    }

    if (!newFirstName) {
        errorMessage = "First name cannot be blank";
    }

    if (!newLastName) {
        errorMessage = "Last name cannot be blank";
    }

    if (Math.floor(Math.random() * 4) === 0) {
        errorMessage = "Error making API call";
    }

    if (errorMessage) {
        setTimeout(() => {
            onError(errorMessage);
        }, delay);
    } else {

        const oldUser = localStorage.getItem(username)

        if (!oldUser) {
            return
        }

        const oldUserData = JSON.parse(oldUser)
        const newUserData = {
            ...oldUserData,
            userFirstName: newFirstName,
            userLastName: newLastName,
        }

        localStorage.setItem(username, JSON.stringify(newUserData))

        const sessionData = newUserData

        setTimeout(() => {
            onSuccess(sessionData);
        }, delay);
    }
};
