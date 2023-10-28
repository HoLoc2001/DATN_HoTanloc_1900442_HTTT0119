const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");

const myOAuth2Client = new OAuth2Client(
    "462172633296-b9a811g0lld5t6ptndrdd6m2ktjnoock.apps.googleusercontent.com",
    "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"
);

myOAuth2Client.setCredentials({
    refresh_token: "1//04PDeXW1APz_WCgYIARAAGAQSNwF-L9IrUdOf09L8s0GTHD3TGpI1J8UeT8A9TYaUmSoGrPS7RNTdLRWQYRj--XFzgnybQTfibFk",
});

let myAccessTokenObject;
myOAuth2Client.getAccessToken().then(function (data) {
    myAccessTokenObject = data;
});
const myAccessToken = myAccessTokenObject?.token;
const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.ADMIN_EMAIL_ADDRESS,
        clientId: "462172633296-b9a811g0lld5t6ptndrdd6m2ktjnoock.apps.googleusercontent.com",
        clientSecret: "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",
        refresh_token: "1//04PDeXW1APz_WCgYIARAAGAQSNwF-L9IrUdOf09L8s0GTHD3TGpI1J8UeT8A9TYaUmSoGrPS7RNTdLRWQYRj--XFzgnybQTfibFk",
        accessToken: myAccessToken,
    },
});

module.exports = transport;
