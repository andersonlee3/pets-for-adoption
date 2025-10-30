import { getAccessToken } from "./auth";

export const makeApiCall = async () => {
    const token = getAccessToken();

    if (!token) {
        console.error("No access to Petfinder API");
    }

    try {
        const response = await fetch("https://api.petfinder.com/v2/animals", {
            method: "GET",
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error making Petfinder call");
        return null;
    }
};