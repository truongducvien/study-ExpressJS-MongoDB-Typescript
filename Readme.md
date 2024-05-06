# ExpressJS + Mongoose + Typescript

This is a basic NodeJS project that is build for studying purpose

### Main features:

1. CRUD
2. Encrypt password before saving to DB with Bcrypt
3. Authentication & authorization with JWT

### Step to run the server:

1. Create MongoDB Atlas database
2. Create .env file. These are keys that needs to connect with MongoDB server

```
PORT=""
DB_CONNECTION_URI=""
DB_NAME=""
SECRET_KEY=""

SENDGRID_VERIFY_KEY=""
SENDGRID_API_KEY=""
SENDGRID_VERIFY_MAIL_TEMPLATE_ID=""
SENDGRID_VERIFY_MAIL_SUCCESS_TEMPLATE_ID=""
SENDGRID_MAIL_SENDER=""

PUBLIC_FE_URL=""
PUBLIC_BE_URL=""
```

3. Install packages:

   `yarn`

4. Start the server:

   `yarn start:dev`

##

### API endpoints:

| Endpoint           | Method | Headers                     | Payload                | Role  | Description                  |
| ------------------ | ------ | :-------------------------- | ---------------------- | ----- | ---------------------------- |
| api/users          | GET    | Authorization: Bearer token |                        | Admin | Get list users               |
| api/users          | POST   | Authorization: Bearer token | _(See UserSchemaType)_ | Admin | Create user                  |
| api/users/:userId  | GET    | Authorization: Bearer token |                        | Admin | Get user by id               |
| api/users/sign-up  | POST   |                             | _(See UserSchemaType)_ |       | Sign up                      |
| api/users/sign-in  | POST   |                             | { email, password }    |       | Sign in                      |
| api/verify/:userId | GET    |                             |                        |       | Verify account after sign in |

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
</div>
