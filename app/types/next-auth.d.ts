// types/nextauth.d.ts or in the root if you prefer
import NextAuth, { DefaultSession } from "next-auth";

// Extending the default Session interface to include accessToken
declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
  }

  interface JWT {
    accessToken?: string;
  }
}
