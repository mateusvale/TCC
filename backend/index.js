const { google } = require('googleapis')

const path = require('path')

const fs = require('fs');

//client id
const CLIENT_ID = '72129100911-8u8mm06gd85v5lo0gbamke5dkauigfo6.apps.googleusercontent.com'

//client secret
const CLIENT_SECRET = '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'

//redirect URL
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

//refresh token
const REFRESH_TOKEN = '1//04s-jfOT2y7p8CgYIARAAGAQSNwF-L9IrkVW4QJZWzpyM7OvGKbxGqj6k_jWni7BsbucJpWPNdudXDdkaMabRaitwF9o5MLDA3z0'

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