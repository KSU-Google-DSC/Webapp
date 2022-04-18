import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { FirebaseAdapter } from '../../../temp_modules/FirebaseAdapter';

// Configure Environmental Variables.
// NODE_ENV is set to 'development' when 'npm run dev' in development mode.
// NODE_ENV is set to 'production' when 'npm start' in production mode.
// DEVELOPERS WILL ALWAYS BE IN DEVELOPMENT MODE.
const dotenv = require('dotenv');
dotenv.config({path: `.env.${process.env.NODE_ENV}`});

console.log('Environment Mode: '+process.env.NODE_ENV);

const firestoreApp = initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
});

const firestore = getFirestore(firestoreApp);

// Configure Authentication Provider.
export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: process.env.GOOGLE_AUTHORIZATION_URL
        }),
    ],
    adapter: FirebaseAdapter(firestore.app),
    secret: process.env.SECRET,
    jwt: {
        encryption: true
    },
    callbacks: {
        
        // Returns session token when callback is invoked.
        session: async({session, token}) => {
            return session;
        },

        // Manage redirect based on whether or not the user is logged in.
        // Also known as a protected routes. If the user is not logged in,
        // redirect (resolve) to the site's landing page ('/').
        redirect: async(url) => {
            return Promise.resolve('/');
        }
    },
    pages: {
        //error: '/auth/error'
    }
})