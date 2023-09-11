import NextAuth from "next-auth";
const handler = NextAuth({
  providers: [
    {
      id: "asgardeo",
      name: "Asgardeo",
      clientId: process.env.ASGARDEO_CLIENT_ID,
      clientSecret: process.env.ASGARDEO_CLIENT_SECRET,
      type: "oauth",
      wellKnown:
        "https://api.asgardeo.io/t/" +
        process.env.ASGARDEO_ORGANIZATION_NAME+
        "/oauth2/token/.well-known/openid-configuration",
      authorization: { params: { scope: "openid email profile internal_login" } },
      idToken: true,
      checks: ["pkce", "state"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.username,
          email: profile.email,
        };
      },
    },
  ],
  secret: "secret1234",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      session.user.id = token.sub;
      session.user.email = token.email;
      return session;
    },
    async jwt({ token, account, profile, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      if (profile) {
        token.name = profile.name;
      }
      return token;
    },
  },

  theme: {
    colorScheme: "light",
  },

  debug: true,
});

export { handler as GET, handler as POST };
