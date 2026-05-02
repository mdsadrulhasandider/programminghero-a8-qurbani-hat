import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!.trim());
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: { enabled: true },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  trustedOrigins: [
    "https://programminghero-a8-qurbani-hat.vercel.app",
  ],

  // env mismatch এড়াতে আপাতত hardcode
  baseURL: "https://programminghero-a8-qurbani-hat.vercel.app",

  cookies: {
    sessionToken: {
      attributes: {
        httpOnly: true,
        secure: true,
        sameSite: "none", // OAuth redirect-এর জন্য দরকার
        path: "/",
      },
    },
  },
});