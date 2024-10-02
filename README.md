
## Start the Backend Server

From the [CalEnderBackend](https://github.com/Vishalsutariya/CalEnderBackend/tree/main) directory:

`node server.js` 

Ensure that the server is running and connected to MongoDB.

### Start the Frontend Application

From your [React project directory](https://github.com/Vishalsutariya/CalEnderUI.git):
`npm start`


## Set Up MongoDB

You can use **MongoDB Atlas** (cloud service) or install MongoDB locally.

-   **MongoDB Atlas**: [Get Started with Atlas](https://www.mongodb.com/cloud/atlas/register)


## Set Up Google API Credentials

### 1.1. Create a Google API Project

1.  Go to the [Google API Console](https://console.cloud.google.com/).
2.  Create a new project or select an existing one.
3.  Navigate to **APIs & Services** > **OAuth consent screen**.
    -   Configure the consent screen (select **External** for testing).
    -   Fill in the required information (App name, User support email, etc.).
4.  Go to **Credentials** > **Create Credentials** > **OAuth client ID**.
    -   Select **Web application**.
    -   Add authorized redirect URIs:
        -   For development: `http://localhost:5000/auth/google/callback`

### 1.2. Obtain Client ID and Client Secret

-   After creating the credentials, you'll receive a **Client ID** and **Client Secret**.
-   Keep these values secure and add them to your `.env` file.

**Security Considerations:**

-   Replace `'your_secret_key'` with a strong secret in `express-session`.
-   Ensure that sensitive information like `GOOGLE_CLIENT_SECRET` is kept secure.
