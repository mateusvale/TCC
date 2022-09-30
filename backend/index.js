// import Multer from "multer"
const Multer = require('multer')

const multer = Multer({
    storage: Multer.diskStorage({
        destination:function (req, file, callback) {
            callback(null, `${__dirname}/image-files`)
        },
        filename: function (req, file, callback) {
            callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
        },
    }),
    limits: {
        fileSize: 5 * 1024 *1024
    }
})

const express = require("express")
const app = express()
app.listen(5000)


require('dotenv').config();

const { google } = require('googleapis')

const path = require('path')

const fs = require('fs');

//secrets
const client_id_key = process.env.NODE_CLIENT_ID
const client_secret_key = process.env.NODE_CLIENT_SECRET
const refresh_token_key = process.env.NODE_REFRESH_TOKEN

//client id
const CLIENT_ID = client_id_key

//client secret
const CLIENT_SECRET = client_secret_key

//redirect URL
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

//refresh token
const REFRESH_TOKEN = refresh_token_key

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
const filePath = path.join(__dirname, 'limoes.jpeg');

//function to upload the file
async function uploadFile() {
    try{
      const response = await drive.files.create({
            requestBody: {
                name: 'limoes.jpeg', //file name in the google drive
                parents: ['1VosBO4KKYoIVOYn7rWFQh2cuINjIYqQb'], //path that you store the uploaded file in google drive
                mimeType: 'image/jpg',
            },
            media: {
                mimeType: 'image/jpg',
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

async function deleteFile(file_id){
    try {
        const response = await drive.files.delete({
            fileId: file_id
        })
        console.log(response.data, response.status)
    } catch (error) {
        console.log(error.message)
    }
}

async function generatePublicUrl(file_id) {
    try {
        await drive.permissions.create({
            fileId: file_id,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        })
        const result = await drive.files.get({
            fileId: file_id,
            fields: 'webViewLink, webContentLink'
        })
        console.log(result.data)
    } catch (error) {
        console.log(error.message)
    }
}


app.post("/upload-file-to-google-drive", multer.single("file"), async (req, res, next) => {
    try {
        if (!req.file){
            res.status(400).send("No file uploaded.")
            return
        }
        const response = await uploadFile()
        res.status(200).json({response})
    } catch (err) {
        console.log(err)
    }
})


// deleteFile('1gp4sy-at5z5qNEoneN4JAeui_F-OPxOS')
// uploadFile();
// generatePublicUrl('1S-qTx-9sPETmfoNNr3nXCQiNFhp__LZq')

