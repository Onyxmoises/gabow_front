import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions={
    providers:[
        GoogleProvider({
            clientId:"924985086613-9raidgplp0u615paaiil0im80emq0ljf.apps.googleusercontent.com",
            clientSecret:"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"
        }),
        FacebookProvider({
            clientId:"214221261249395",
            clientSecret:"9fcc18de47b493f8c6ada2fdca2c9ebe"
        }),
        /*
        DiscordProvider({
            clientId:"1095935573111353368",
            clientSecret:"9deb635342472e62e63c9384983d3ec6938c5e671be45d012e9b4eb78264fefe"
        })
        */
    ],
    secret:"IoBIG5YFnH"
}

export default NextAuth(authOptions);
