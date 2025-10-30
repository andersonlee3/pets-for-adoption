let accessToken: string | null = null;
let expiresIn: number | null = null;

export const fetchAccessToken = async () => {
    try {
        const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: import.meta.env.VITE_API_KEY,
                client_secret: import.meta.env.VITE_SECRET,
            }),
        });

        const data = await response.json();

        accessToken = data.access_token;
        expiresIn = data.expires_in;
    }
    catch (error) {
        console.error('Token fetch error: ', error);
    }
}

export const getAccessToken = () => accessToken;

export const getExpiresIn = () => expiresIn;