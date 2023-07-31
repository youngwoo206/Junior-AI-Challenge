import { SessionData } from "types";

export const userUpdate = (
    sessionId: number,
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

    if (sessionId !== 1) {
        errorMessage = "Invalid session Id";
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
        localStorage.setItem("firstName", newFirstName);
        localStorage.setItem("lastName", newLastName);
        const sessionData: SessionData = {
            sessionId: 1,
            username: "user",
            userFirstName: newFirstName,
            userLastName: newLastName,
        };
        setTimeout(() => {
            onSuccess(sessionData);
        }, delay);
    }
};
