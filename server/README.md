# server

Software Requirements before-hand

1. Node version 10+ (<https://nodejs.org/en/>)
2. Postman/Insomnia (Client to send/receive requests)
3. MongoDB Atlas (GUI to see DB contents) - https://www.mongodb.com/products/compass

Software stack here

- NodeJS
- MongoDB
- Typescript

**Pre-Setup**
.env file needed in root folder to provide the proper credentials and settings
Before running the repository, ping @andyrobert3 for the .env file contents

IP Whitelisting needed before connecting to MongoDB, ping @andyrobert3 with your IP address to be whitelisted

**Setup**

1. npm install
2. Ensure .env file is present in root folder, check pre-setup section above for more information
3. Run server with `npm run dev`

**Testing**

1. Make sure route is set-up in `/routes/index.ts`
2. Run `npm run dev` in terminal
3. Use Postman to test out server locally on `localhost:{PORT_NUMBER}/`, PORT_NUMBER depends on .env file

**Structure**

1. Routes (handle routing of requests to the controller)
2. Controller (handles services to call and requests/responses to apply)
3. Service (handles business logic)
4. Model (defines schema required)
