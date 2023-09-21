import NextAuth from "next-auth"

export default NextAuth({
  providers: [
    {
      id: "asgardeo",
      name: "Asgardeo",
      clientId: process.env.ASGARDEO_CLIENT_ID,
      clientSecret: process.env.ASGARDEO_CLIENT_SECRET,
      type: "oauth",
      wellKnown: "https://api.asgardeo.io/t/" + (process.env.ASGARDEO_ORGANIZATION_NAME)+ "/oauth2/token/.well-known/openid-configuration",
      authorization: { params: { scope: process.env.ASGARDEO_SCOPES } },
      idToken: true,
      checks: ["pkce", "state"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        }
      },
    },
  ],
  secret: process.env.SECRET,

  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user?.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
  },

  theme: {
    colorScheme: "light",
  },

  debug: true,
})
