# ExpressJS + Mongoose + Typescript

This is a basic NodeJS project that is build for studying purpose

### Main features:

1. CRUD
2. Encrypt password before saving to DB with Bcrypt
3. Authentication & authorization with JWT
4. Authentication with Google through OAuth 2.0 (Using Passport JS)
5. Upload file to cloud (AWS - S3)

### Step to run the server:

1. Create MongoDB Atlas database
2. Create .env file. These are keys that needs to connect with MongoDB server

```
PUBLIC_FE_URL="http://127.0.0.1:5500"
PUBLIC_API_URL="http://127.0.0.1:3003"
PORT="3003"
SECRET_KEY="y6oZwfnQ9D6Zt1xY93Hj4M0nWj96dxoS"

## Database:
DB_CONNECTION_URI=""
DB_NAME=""

# Mail sender:
SENDGRID_VERIFY_KEY=""
SENDGRID_API_KEY=""
SENDGRID_VERIFY_MAIL_TEMPLATE_ID=""
SENDGRID_VERIFY_MAIL_SUCCESS_TEMPLATE_ID=""
SENDGRID_MAIL_SENDER=""

## Google Auth:
GOOGLE_CLIENT_ID=""
GOOGLE_CIENT_SECRET=""

## AWS
AWS_S3_BUCKET_NAME=""
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_REGION=""
AWS_OBJECT_DOMAIN=""
```

3. Install packages:

   `yarn`

4. Start the server:

   `yarn start:dev`

##

### API endpoints:

| Endpoint                 | Method | Headers                     | Payload                              | Role  | Description                                                  |
| ------------------------ | ------ | :-------------------------- | ------------------------------------ | ----- | ------------------------------------------------------------ |
| api/users                | GET    | Authorization: Bearer token |                                      | Admin | Get list users                                               |
| api/users                | POST   | Authorization: Bearer token | _(See UserSchemaType)_               | Admin | Create user                                                  |
| api/users/:userId        | GET    | Authorization: Bearer token |                                      | Admin | Get user by id                                               |
| api/auth/sign-up         | POST   |                             | _(See UserSchemaType)_               |       | Sign up                                                      |
| api/auth/sign-in         | POST   |                             | { email, password }                  |       | Sign in                                                      |
| api/auth/verify/:userId  | GET    |                             |                                      |       | Verify account after sign in                                 |
| api/auth/redirect/verify | POST   | Authorization: Bearer token | {token: verify token}                |       | Verify redirect token                                        |
| api/file/pre-signed-url  | GET    |                             | {file-name: File's name}             |       | Get Presigned-url (FE will use this to upload file directly) |
| api/file/signed-url      | GET    |                             | {file-key: File's key in S3 storage} |       | Get file's signed-url (This is a temporary url)              |

### General information:

Admin email: vien.truong.shop@yopmail.com

##

<div style='display: flex; justify-content: center; gap: 20px; flex-wrap: wrap'>
  <a href="https://expressjs.com/" target="_blank">
    <img src="https://expressjs.com/images/express-facebook-share.png" alt="expressjs" title="ExpressJS" min-width="40" height="40"/>
  </a>
  <a href="https://www.mongodb.com/" target="_blank">
    <img src="https://w7.pngwing.com/pngs/956/695/png-transparent-mongodb-original-wordmark-logo-icon-thumbnail.png" alt="MongoDB" title="MongoDB" min-width="40" height="40"/>
  </a>
  <a href="https://mongoosejs.com/" target="_blank">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQltfbPnGvdTOlfmF5F-u-SCmW9NoJ5yNybxnAGeckXsg&s" alt="Mongoose" title="Mongoose" min-width="40" height="40"/>
  </a>
  <a href="https://jwt.io/" target="_blank">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4VF0m8nvqLyrkXsLmTOHjlG9drd1qptu9sfnxTl8LaA&s" alt="JWT" title="JWT" min-width="40" height="40"/>
  </a>
  <a href="" target="_blank">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYAsUc7PTA4ShWqqSSHIZkBc7dJf8DbsuMp80CFfiifQ&s" alt="Bcrypt Hash" title="Bcrypt Hash" min-width="40" height="40"/>
  </a>
  <a href="" target="_blank">
    <img src="https://miro.medium.com/v2/resize:fit:1400/1*1uqt6nCd57rb7RyUbeQFjw.png" alt="PassportJS" title="PassportJS" min-width="40" height="40"/>
  </a>
  <a href="" target="_blank">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-jCtEO6HH2IS66vGM_BOhmUOBo7r8mUGSukqfSy36ow&s" alt="Amazon S3" title="Amazon S3" min-width="40" height="40"/>
  </a>
</div>
