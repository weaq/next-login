import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({

  providers: [
    CredentialsProvider({
      name: 'member',

      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        const res = await fetch(`${process.env.API_MEMBER_DB}login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const data = await res.json()

        if (data.status == 'ok') {
          return data
        }

        // Return null if user data could not be retrieved
        return null
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {

    async signIn({ user, account, profile }) {

      if (account.provider === "google") {
        //console.log(profile)
        //return profile.email_verified && profile.email.endsWith("@example.com")
        const response = await fetch(
          `${process.env.API_MEMBER_DB}userExists`
        ,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: profile.email,
              fname: profile.given_name,
              lname: profile.family_name,
              username: profile.email,
              password: profile.at_hash
            })
          })

        const data = await response.json();


        if (data.status == 'ok') {
          user.user = data
          return true
        } else {
          user.user = null
        }

        // Return null if user data could not be retrieved
        return null

      }

      return true

    },

    async jwt({ token, user, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        //token.accessToken = account.access_token
        if (account.provider === "google") {
          token.user = user.user
        } else {
          token.user = user
        }
      }
      
      return token
    },

    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.user.accessToken
      session.user = token.user.user
      return session
    },


  }
})

