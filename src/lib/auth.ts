import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!.trim());
const db = client.db();

export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }
    },
    secondaryStorage: {
        get: async (key) => {
            return null;
        },
        set: async (key, value, expiration) => {
        },
        delete: async (key) => {
        }
    },
    trustedOrigins: [
        "http://localhost:3000",
        "https://programminghero-a8-qurbani-hat.vercel.app"
    ],
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000"
});
