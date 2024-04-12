# Setting Up the MERN Booking App

This guide will walk you through the process of setting up the MERN Real Estate on your local machine.

## Prerequisites

Before you begin, ensure you have Node.js installed on your system.

## Cloning the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/shanthi1710/Estate.git
cd Estate
```

## Backend Configuration

1. **Environment Files**: Navigate to the `backend` folder and create two files: `.env` and `.env.e2e`. Add the following contents to both files:

    ```plaintext
    MONGO_URL=
    PORT=
    JWT_SECRET=
    ```

2. **MongoDB Setup**: 
    - Sign up for an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
    - Create a new cluster and follow the instructions to set up a new database.
    - Once set up, obtain your MongoDB connection string and add it to the `MONGO_URL` variable in your `.env` files.
     
3. **JWT_SECRET_KEY**:
    - This just needs to be any long, random string. You can google "secret key generator".

7. **Frontend URL**:
    - The `FRONTEND_URL` should point to the URL where your frontend application is running (typically `http://localhost:3000` if you're running it locally).
  

## Frontend Configuration

1. **Environment Files**: Navigate to the `frontend` folder and create a file: `.env`:

    ```plaintext
    VITE_FIREBASE_API_KEY=
    ```

5. **VITE_FIREBASE_API_KEY**: 
    - To obtain the VITE_FIREBASE_API_KEY, you need to create a Firebase project on the Firebase console (https://console.firebase.google.com/) and then navigate to project settings where you can find your API key under the "General" tab.

## Running the Application

1. **Backend**:
    - Navigate to the `api` directory.
    - Install dependencies: `npm install`.
    - Start the server: `npm run dev`.

2. **Frontend**:
    - Open a new terminal and navigate to the `client` directory.
    - Install dependencies: `npm install`.
    - Start the frontend application: `npm run dev`.
    - The application should now be running on `http://localhost:5173` but verify this in your command line terminal  
