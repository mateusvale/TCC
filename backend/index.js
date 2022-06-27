const { google } = require('googleapis')

const path = require('path')

const fs = require('fs');

//client id
const CLIENT_ID = ''

//client secret
const CLIENT_SECRET = ''

//redirect URL
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

//refresh token
const REFRESH_TOKEN = ''

//intialize auth client
const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

//file path for out file
const filePath = path.join(__dirname, 'filename.format');

//function to upload the file
async function uploadFile() {
    try{
      const response = await drive.files.create({
            requestBody: {
                name: 'hero.png', //file name
                mimeType: 'image/png',
            },
            media: {
                mimeType: 'image/png',
                body: fs.createReadStream(filePath),
            },
        });  
        // report the response from the request
        console.log(response.data);
    }catch (error) {
        //report the error message
        console.log(error.message);
    }
}  