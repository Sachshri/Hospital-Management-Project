# Hospital Management System

## Steps for the Project

## Step 1: Install the following necessary modules

### 1. bcrypt

A library for hashing passwords. It provides methods to create and compare hashes, which is essential for securely storing user passwords.

### 2. cloudinary

A service and library for managing images and videos. It allows you to upload, store, and transform media files in the cloud.

### 3. dotenv

A module that loads environment variables from a `.env` file into `process.env`. It’s used to manage sensitive configuration data like API keys and database URLs.

### 4. cookie-parser

Middleware for parsing cookies attached to client requests. It populates `req.cookies` with an object containing the parsed cookies.

### 5. cors

Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express. It allows your server to handle requests from different domains.

### 6. express

A web application framework for Node.js. It provides a robust set of features for building web and mobile applications, including routing and middleware support.

### 7. mongoose

An Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and makes it easier to work with MongoDB.

### 8. express-fileupload

Middleware for handling file uploads in Express. It simplifies the process of uploading files to your server.

### 9. jsonwebtoken

A library for creating and verifying JSON Web Tokens (JWT). It's commonly used for authentication, allowing you to securely transmit information between parties as a JSON object.

### 10. validator

A library for string validation and sanitization. It offers a range of functions to validate and sanitize strings, such as checking for email formats or trimming whitespace.

```terminal
    npm install validator mongoose bcrypt express jsonwebtoken express-fileupload cors cookie-parser dotenv cloudinary 
```

## Step 2: Update the package.json file

1. make the following changes

```json
    "type": "module",
    "scripts": {
    "start":"node server.js",
    "dev":"nodemon server.js"
  },
```

## Step 3: Now create these files

1. app.js

   ```javascript
        import express from 'express';
        const app=express();
        export default app;
   ```

2. server.js

 ```javascript
        import app from '/app.js'
            app.listen(4000,()=>{
                console.log(`Server is running on port ${4000}`)
            });
```

>>Now we do not want that our server port is visible to anyone at server.js file.
So we create a config.env file to store all our environment variables used in the project

   3.config.js

path of file: Backend/config/config.js

   ```env
    PORT=4000

    FRONTEND_URL=http://localhost/4005

    DASHBOARD_URL=http://localhost/4010

    MONGO_URI= This will get from monogo cluster

    JWT_SECRET_KEY=put anything from your side

    JWT_EXPIRES=7d

    COOKIE_EXPIRE=7

    CLOUDINARY_CLOUD_NAME=get from the cloudinary page

    CLOUDINARY_API_SECRET=get from cloudinary access keys page

    CLOUDINARY_API_KEY= get from cloudinary access key page

   ```

## Step 4: Use Middlewares in app.js

```javascript
      import express from 'express';
      import {config} from "dotenv"
      import cors from 'cors'
      import cookieParser from 'cookie-parser';
      import fileUpload from 'express-fileupload';
      const app=express();
      config({path:'./config/config.env'})

      app.use(cors({
          origin:[process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
          methods:['GET','POST','PUT','DELETE'],
          credentials:true,
      }));

      app.use(cookieParser());
      app.use(express.json());
      app.use(express.urlencoded({extended:true}));
      app.use(fileUpload(
          {
              useTempFiles:true,
              tempFileDir:'/tmp/',
          }
      ))
      export default app;
```

### cors

origin:

This specifies the allowed origins from which requests can be made to your API

methods:

This defines the HTTP methods that are allowed for CORS requests. In this case, it allows GET, POST, PUT, and DELETE methods.

credentials:

This setting determines whether credentials (such as cookies or HTTP authentication headers) should be included in the CORS requests

#### Imports

Import: import express from 'express';
Purpose: Express is a web application framework for Node.js, designed to simplify the creation of server-side web applications. It provides a robust set of features for building web and mobile applications. Here, you import it to create an Express application (app).

#### Import: import { config } from "dotenv"

Purpose: dotenv loads environment variables from a .env file into process.env. This is crucial for managing sensitive information like API keys and database credentials. You configure it by specifying the path to your .env file, ensuring your application can access these variables.
cors:

#### Import: import cors from 'cors'

Purpose: CORS (Cross-Origin Resource Sharing) is a mechanism that allows resources on a web server to be requested from another domain. The cors middleware is used to configure CORS settings in your Express app, enabling or restricting requests from specified origins (like your frontend and dashboard).
cookie-parser:

#### Import: import cookieParser from 'cookie-parser'

Purpose: cookie-parser is middleware that parses cookies attached to client requests. Cookies are often used for session management or storing small pieces of data on the client-side. This middleware populates req.cookies with an object representing the parsed cookies.
express-fileupload:

#### Import: import fileUpload from 'express-fileupload'

Purpose: This middleware simplifies the process of handling file uploads in your Express app. It allows you to accept files via forms or other HTTP requests. The useTempFiles option enables the use of temporary files during the upload process, and tempFileDir specifies the directory for these temporary files.

### Middleware Configuration

#### CORS Middleware

Explanation: This middleware allows your server to handle requests from the specified frontend and dashboard URLs. The methods array restricts the HTTP methods allowed from these origins. The credentials: true option allows cookies and authentication data to be included in requests, which is necessary for sessions or secure data handling.

#### Cookie Parser Middleware

Explanation: This middleware automatically parses any cookies sent with incoming requests and makes them accessible via req.cookies. It simplifies cookie management in your application, making it easier to handle user sessions, preferences, and other data stored in cookies.
JSON and URL-Encoded Middleware:

#### express.json() parses JSON payloads, which is useful for APIs that receive JSON data

express.urlencoded({ extended: true }) parses URL-encoded data, typically used in form submissions. The extended: true option allows for complex objects and arrays to be encoded.
File Upload Middleware:

#### FileUpload Middleware

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));
Explanation: This middleware handles file uploads, enabling your server to accept files sent via forms or other requests. The useTempFiles: true option tells the server to store uploaded files temporarily on the disk before they are processed. The tempFileDir specifies the directory where these temporary files will be stored.

## STEP 5: CONNECT TO MongoDB

create file in folder database dbConnect.js
path: Backend/database/dbConnect.js

```javascript
      import mongoose from 'mongoose'
      export const dbConnect=()=>{
        mongoose.connect(process.env.MONGO_URI,{
          dbName:"HOSPITAL_MANAGEMENT_SYSTEM"
        }).then(()=>{
          console.log("Connected to database");
        }).catch((err)=>{
            console.log(`some error occured during coonnection to the database ${err}`)
        })
      }
```

### Import Cloudinary in server.js

```javascript
      import app from './app.js'
import cloudinary from 'cloudinary'

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
});
```

1. Cloudinary v2: This refers to the second major version of the Cloudinary library. It might include new features, improvements, or bug fixes compared to previous versions.
2. config: The config method is used to set the configuration options for the Cloudinary library. These options are essential for the library to connect to your Cloudinary account and perform operations like uploading, downloading, and transforming images

## STEP 6. Create Model, Controller and Router

### messageSchema.js

Path: Backend/models/messageSchema.js
Create message Schema

```javascript
    import mongoose from 'mongoose'
import validator from 'validator'

const messageSchema=new mongoose.Schema({

    firstName:{
        type: String,
        required:true,
        minLength:[2,"First Name atleast contain 2 characters!"]
    },
    lastName:{
        type: String,
        required:true,
        minLength:[2,"Last Name atleast contain 2 characters!"]
    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail,'Please Provide a valid email!'],
    },
    phone:{
        type:String,
        required: true,
        minLength:[10,"Phone Number Must contain 10 digits!"],
        maxLength:[10,"Phone Number exact contain 10 digits"]
    },
    message:{
        type: String,
        required: false,
        minLength:[10,"Message contain atleast 10 Character!"]
    }
}
)

export const Message=mongoose.model('Message',messageSchema)
```

### messageController.js

path: Backend/controller/messageController.js

```javascript
    import {Message} from '../models/messageSchema.js'

export const sendMessage= async(req,res,next)=>{
    const {firstName,lastName,email,phone,message}=req.body;

    if(!firstName ||!lastName||!email||!phone||!message){
        return res.status(400).json({
            success: false,
            message: "Please fill the form"
        });
    }
    await Message.create( {firstName,lastName,email,phone,message});
    req.status(200).json({
        success:true,
        message:"Message created successfully!"
    });
};
```

### messageRouter.js

path: Backend/router/messageRouter.js

```javascript
    import express from 'express'
import { sendMessage } from '../controller/messageController.js';
const router=express.Router();

router.post('/send',sendMessage)

export default router;

```

### Update app.js

```javascript
    import express from 'express';
import {config} from "dotenv"
import cors from 'cors'
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { dbConnect } from './database/dbConnect.js';
import messageRouter from './router/messageRouter.js';

const app=express();
config({path:'./config/config.env'})

app.use(cors({
    origin:[process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload(
    {
        useTempFiles:true,
        tempFileDir:'/tmp/',
    }
))
app.use('/api/v1/message',messageRouter)
dbConnect()
export default app;
```

The string '/api/v1/message' in the code snippet app.use('/api/v1/message', messageRouter) represents the base URL path for the routes defined in the messageRouter.

Here's a breakdown:

/api: This part indicates that the route is part of the application's API (Application Programming Interface). It's common practice to prefix API routes with /api to distinguish them from other routes like frontend routes.

/v1: This refers to version 1 of the API. Versioning is important when you want to make changes to your API while maintaining backward compatibility with clients that might be using older versions. If you release a new version of the API, you might have routes under /api/v2, for example.

/message: This part of the URL suggests that the routes in the messageRouter relate to messages. It could include operations like creating, reading, updating, or deleting messages.

Putting it all together:

The full URL path /api/v1/message is the base route.
All the routes defined in messageRouter will be accessible under this path. For example, if messageRouter has a route for handling POST requests, it might handle a request sent to /api/v1/message.

## STEP 7. Install postman extension and signup

## What is PostMan?

Postman is a popular API development and testing tool that allows developers to easily design, test, document, and share APIs. It provides a user-friendly interface for making HTTP requests to APIs and viewing the responses, which is extremely helpful when working with RESTful APIs, SOAP, GraphQL, and other web services.

Key Features of Postman:
Request Building:

You can create and save different types of HTTP requests like GET, POST, PUT, DELETE, etc.
You can customize headers, query parameters, body (including raw JSON, form data, etc.), and authentication details for each request.
Response Handling:

Postman displays the response from the server, including status codes, headers, and body content.
You can view responses in different formats, such as JSON, HTML, XML, or plain text.
Collections:

Postman allows you to group your API requests into collections, making it easier to organize and manage related requests.
Environment Management:

Postman supports environments, which are sets of variables that can be used across requests. This is useful for switching between different API environments like development, testing, and production.
Testing and Automation:

You can write test scripts in JavaScript to validate API responses automatically. For example, you can check if a specific field exists in the response or if the response status code is as expected.
Postman also supports automated testing through its integration with CI/CD pipelines using Newman, a command-line companion for Postman.
Collaboration:

Teams can collaborate on API development by sharing collections, environments, and test scripts. Postman provides features like version control and real-time collaboration.
Documentation:

You can generate and publish API documentation directly from your Postman collections, making it easier to share API details with others.
Mock Servers:

Postman can create mock servers to simulate API endpoints, which is useful for front-end developers to work on their applications even when the back-end isn’t fully ready.
Common Uses of Postman:
API Testing: Test API endpoints to ensure they work as expected, including sending various requests and checking responses.
Debugging: Identify issues with API calls by inspecting request details and responses.
Documentation: Document API endpoints, including request/response formats, and share this documentation with your team.
Automation: Automate API testing and integrate it with continuous integration workflows.
Collaboration: Share API requests, collections, and documentation with team members for collaborative development.

### Install PostMan extension

and signup or login in the postman account

1. Now create a folder in PostMan Name "Your Project Name"
2. Create a new folder inside it "Message"
3. Create a post reqest in that "Message" folder
4. Select request type and set the url from where you get the request

<http://localhost:serverPort/api/v1/message/send>

1. Send a HTTP Request
2. Get the Message in response window in postman request
3. you will get your data in monodb database collection

## STEP 8: Create Middlewares to handle server crash

I noticed that there is a crash in the server when there is a invalid request. So, we need a middleware which will help us to survive

### catchAsyncErrors.js

path: Backend/middlewares/catchAsyncErrors.js

```javascript
    export const catchAsyncErrors=(asyncFunction)=>{
    return (req,res,next)=>{
        Promise.resolve(asyncFunction(req,res,next)).catch(next)
    }
}
```

Changes in messageController.js

```javascript
    import {Message} from '../models/messageSchema.js'
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js'


export const sendMessage= catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,message}=req.body;

    if(!firstName ||!lastName||!email||!phone||!message){
        return res.status(400).json({
            success: false,
            message: "Please fill the form"
        });
    }
    await Message.create({firstName,lastName,email,phone,message});
    res.status(200).json({
        success:true,
        message:"Message Send successfully!"
    });
})
```

1. Function Signature
catchAsyncErrors is a higher-order function, meaning it takes a function as an argument and returns a new function.
The argument, asyncFunction, is expected to be an asynchronous function (typically an async route handler or middleware in Express.js).
2. Returning a Function
The function returned by catchAsyncErrors is a middleware function itself. It takes three arguments: req, res, and next, which are standard in Express.js.
req (request): Represents the HTTP request and contains properties about the request.
res (response): Represents the HTTP response that an Express app sends when it gets an HTTP request.
next: A function that passes control to the next middleware function.
3. Executing the Asynchronous Function
Inside the returned function, the asyncFunction is called with the req, res, and next arguments.
The asyncFunction is usually an async function, meaning it returns a promise.
4. Handling the Promise
Promise.resolve(asyncFunction(req, res, next)) is used to ensure that asyncFunction is wrapped in a promise. Even if the function was not originally a promise, this guarantees it will be treated as one.
The .catch(next) part ensures that if the promise is rejected (i.e., if asyncFunction throws an error or rejects), the error will be passed to the next function.
5. Error Handling in Express
In Express.js, when next is called with an argument, it's treated as an error, and Express will skip any remaining non-error handling middleware and go straight to the error-handling middleware.
This pattern is useful for ensuring that any errors that occur in asynchronous route handlers are properly caught and forwarded to the error-handling middleware, preventing the app from hanging or crashing.

### errorMiddleware.js

path: Backend/middlewares/catchAsyncErrors.js
This is used to handle errors during the error

```javascript
    class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
    }
}

export const errorMiddleware=(err,req,res,next)=>{
    err.message=err.message||'Internal Server Error'
    err.statusCode=err.statusCode|| 500

    if(err.code==11000){
        const message=(`Duplicated ${Object.keys(err.keyValue)} Entered`)
        err=new ErrorHandler(message,400)
    }
    if(err.name=='JsonWebTokenError'){
        const message=("Json Web Token is invalid! Try Again")
        err=new ErrorHandler(message,400)
    }
    if(err.name=='TokenExpiredError'){
        const message=("Json Web Token is Expire! Try Again")
        err=new ErrorHandler(message,400)
    }
    if(err.name=='CastError'){
        const message=(`Invalid ${err.path}`)
        err=new ErrorHandler(message,400)
    }
    return res.status(err.statusCode).json({
        success: false,
        message:err.message
    })
};
export default ErrorHandler
```

A custom ErrorHandler class that extends the built-in Error class.
An errorMiddleware function that handles various types of errors in a consistent way and returns a proper JSON response.
Explanation of the Code

1. ErrorHandler Class
The ErrorHandler class is a custom error class that extends the native JavaScript Error class. It adds a statusCode property to standardize error handling in the application.

```javascript
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);  // Call the parent class constructor (Error)
        this.statusCode = statusCode;  // Add a statusCode property to the error object
    }
}
```

super(message): This calls the parent Error class constructor, initializing the message property of the error.
this.statusCode = statusCode: Adds a statusCode property to the error instance, which allows for more precise HTTP status code handling in the error responses.

1. errorMiddleware Function
This function is an Express middleware function that is used to handle errors centrally. It catches errors thrown in any route or middleware and sends a structured JSON response to the client.

```javascript

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || 'Internal Server Error';
    err.statusCode = err.statusCode || 500;

    // Handle specific error types
    if (err.code == 11000) {  // MongoDB duplicate key error
        const message = `Duplicated ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);  // Set error to custom error with a 400 status code
    }
    if (err.name == 'JsonWebTokenError') {  // Invalid JWT
        const message = "Json Web Token is invalid! Try Again";
        err = new ErrorHandler(message, 400);
    }
    if (err.name == 'TokenExpiredError') {  // Expired JWT
        const message = "Json Web Token is Expired! Try Again";
        err = new ErrorHandler(message, 400);
    }
    if (err.name == 'CastError') {  // Mongoose CastError (invalid ObjectId or similar)
        const message = `Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
    //This line is used to get only the message we has written in messageSchema
    const errorMessage=err.errors? Object.values(err.errors).map((error)=>error.message).join(' '):err.message;
    // Send a response to the client with the error status and message
    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage
    });
};
```

#### What the Middleware Does

1. Defaults: If the error does not have a message or status code, it defaults to "Internal Server Error" and HTTP status code 500.
2. Handles Specific Error Types:
Duplicate Key Error (err.code == 11000): Occurs when inserting a duplicate value for a unique field in MongoDB.
JWT Errors:
JsonWebTokenError: When a malformed or invalid JWT is detected.
TokenExpiredError: When a JWT has expired.
CastError: When an invalid format for a MongoDB ObjectId or similar is provided.
Returns JSON Response: It sends a JSON response with the error statusCode and message, making it easy for the client to understand what went wrong.

How to use :
import express from 'express';
import { errorMiddleware } from './path/to/your/errorMiddlewareFile';

const app = express();

// Define routes here

// Use the error handling middleware
app.use(errorMiddleware);

app.listen(3000, () => {
    console.log(`Server running on ${process.env.PORT}`);
});

#### Update messageContorller.js

```javascript
    import {Message} from '../models/messageSchema.js'
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js'
import {ErrorHandler} from '../middlewares/errorMiddleware.js'

export const sendMessage= catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,message}=req.body;

    if(!firstName ||!lastName||!email||!phone||!message){
        return next(new ErrorHandler('Please fill the form! ',400))
    }
    await Message.create({firstName,lastName,email,phone,message});
    res.status(200).json({
        success:true,
        message:"Message Send successfully!"
    });
})
```

## STEP 9: Create userSchema.js UserSchema Model

path: Backend/models/userSchema.js

```javascript
    import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema=new mongoose.Schema({

    firstName:{
        type: String,
        required:true,
        minLength:[2,"First Name atleast contain 2 characters!"]
    },
    lastName:{
        type: String,
        required:true,
        minLength:[2,"Last Name atleast contain 2 characters!"]
    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail,'Please Provide a valid email!'],
    },
    phone:{
        type:String,
        required: true,
        minLength:[10,"Phone Number Must contain 10 digits!"],
        maxLength:[10,"Phone Number exact contain 10 digits"]
    },
    aadhar_number:{
        type: String,
        required: false,
        minLength:[12,"Phone Number Must contain 10 digits!"],
        maxLength:[12,"Phone Number exact contain 10 digits"]
    },
    gender:{
        type: String,
        required:true,
        enum:['Male','Female']
    },
    DOB:{
        type: Date,
        required:[true,"Date of Birth is mandatory"]
    },
    password:{
        type:String,
        required:true,
        minLength:[8,"Password atleast contain 8 characters!"],
        select:false
    },
    role:{
        type:String,
        required:true,
        enum:['Admin','Patient','Doctor'],
    },
    doctorDepartment:{
        type:String
    },
    docAvatar:{
        type:String,
        url: String,
    }
}
);

userSchema.pre('save',async(next)=>{
    if(!this.isModified('password')){
        next();
    }
    this.password=await bcrypt.hash(this.password,10)
});

userSchema.methods.comparePassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
userSchema.methods.generateJsonWebToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES
    })
}
export const User=mongoose.model('User',userSchema)
```

COde Explaination:

1. Import Statements

```javascript
    import mongoose from 'mongoose';
    import validator from 'validator';
    import bcrypt from 'bcrypt';
    import jwt from 'jsonwebtoken';
```

mongoose: An ODM library for MongoDB, used to define and interact with MongoDB documents via schemas.
validator: A library that provides string validation and sanitization functions (e.g., checking if an email is valid).
bcrypt: A library for hashing passwords securely.
jsonwebtoken: A library for generating and verifying JSON Web Tokens (JWTs), commonly used for authentication.
2. User Schema Definition

```javascript

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minLength: [2, "First Name must contain at least 2 characters!"] },
    lastName: { type: String, required: true, minLength: [2, "Last Name must contain at least 2 characters!"] },
    email: { type: String, required: true, validate: [validator.isEmail, 'Please provide a valid email!'] },
    phone: { type: String, required: true, minLength: [10, "Phone Number must contain 10 digits!"], maxLength: [10, "Phone Number must contain exactly 10 digits"] },
    aadhar_number: { type: String, required: false, minLength: [12, "Aadhar Number must contain 12 digits!"], maxLength: [12, "Aadhar Number must contain exactly 12 digits"] },
    gender: { type: String, required: true, enum: ['Male', 'Female'] },
    DOB: { type: Date, required: [true, "Date of Birth is mandatory"] },
    password: { type: String, required: true, minLength: [8, "Password must contain at least 8 characters!"], select: false },
    role: { type: String, required: true, enum: ['Admin', 'Patient', 'Doctor'] },
    doctorDepartment: { type: String },
    docAvatar: { type: String, url: String },
});
```

firstName & lastName: Strings that are required with a minimum length of 2 characters.
email: A required string validated to ensure it is a properly formatted email using validator.isEmail.
phone: A required string with a length exactly of 10 characters.
aadhar_number: A string representing an optional Indian Aadhar number with exactly 12 characters.
gender: A required string that must be either "Male" or "Female".
DOB: A required date field representing the user's date of birth.
password: A required string with a minimum length of 8 characters. The select: false option ensures this field is not returned in query results by default.
role: A required string that specifies the user's role, which can be either "Admin," "Patient," or "Doctor".
doctorDepartment: A string specifying the department of the doctor.
docAvatar: A field for storing the doctor's avatar, which is an image URL.
3. Pre-save Middleware for Password Hashing

```javascript
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});
```

Purpose: This middleware runs before a user document is saved (pre('save')).
Logic:
Checks if the password field has been modified. If not, it calls next() to proceed without hashing.
If the password is modified, it hashes the password using bcrypt with a salt round of 10 before saving it to the database.
4. Method to Compare Passwords

```javascript
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
```

Purpose: This instance method is used to compare a provided password (enteredPassword) with the hashed password stored in the database.
Logic: Uses bcrypt.compare to check if the entered password matches the stored, hashed password.
5. Method to Generate JWT

```javascript
userSchema.methods.generateJsonWebToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES
    });
};
```

Purpose: This instance method generates a JWT for the user, which can be used for authentication.
Logic:
The token contains the user's ID (this._id) as payload.
The token is signed with a secret key (process.env.JWT_SECRET_KEY) and has an expiration time (process.env.JWT_EXPIRES).
6. Model Export

```javascript
export const User = mongoose.model('User', userSchema);
```

Purpose: Creates and exports the User model based on the defined schema (userSchema).
Usage: This User model can be used throughout the application to interact with the users collection in MongoDB (e.g., creating, reading, updating, and deleting user documents).

## STEP 10: CREATE userController.js

path: Backend/controller/userController.js

```javascript
import {catchAsyncErrors} from '../middlewares/catchAsyncErrors.js'
import ErrorHandler from '../middlewares/errorMiddleware.js'
import User from '../models/userSchema.js'

export const patientRegister=catchAsyncErrors(async(req,res,next)=>{
   const {  firstName,
            lastName,
            email,
            phone,
            password,
            gender,
            aadhar_number,
            DOB,
            role
        }=req.body

        if( !firstName||
            ! lastName||
            ! email||
            ! phone||
            ! password||
            ! gender||
            ! aadhar_number||
            ! DOB||
            ! role) {
                return next(new ErrorHandler('Please fill the full form!',400));
            } 
            let user=await User.findOne({email,phone});
            if(user){
                return next(new ErrorHandler('User Already Exists!'))
            }
            user=await User.create({
                firstName,
                lastName,
                email,
                phone,
                password,
                gender,
                aadhar_number,
                DOB,
                role
            })
            res.status(200).json({
                success: true,
                message: "User Registered!"
            })
});
```

### userRouter.js

path: Backend/router/userRouter.js

```javascript
import express from 'express'
import { patientRegister } from '../controller/userController.js'
const router=express.Router()

router.post('/patient/register',patientRegister)

export default router
```

## STEP 11: MAKE A NEW HTTP REQUEST patient/register

```javascript
    // in app.js add these lines above the dbConnect() method
    app.use('/api/v1/user',userRouter)
```

create a new folder in postman with a request in it patient register

## STEP 12: Create a new function in userController.js to make the user login using that

userController.js

```javascript
export const login=catchAsyncErrors(async(req,res,next)=>{
    const {role,email,password,confirmPassword}=req.body;
    if(!role||!email||!password||!confirmPassword){
        return next(new ErrorHandler("Please fill all the details!"),400);
    }
    let user= await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid Password or email!"),400);
    }
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Password and Confirm Password don't match!"),400)
    }

    if(role!=user.role){
        return next(new ErrorHandler("User Role don't match!"),400)
    }
    res.status(200).json({
        success: true,
        message:"User LoggedIn Successfully!"
    })
})
```

add `router.post('/login',login)` in userRouter.js

`After this create another request in User folder in postman`

### Create a folder name utils and make a js file named jwtToken.js

```javascript
    const generateToken=(user,message,statusCode,res)=>{
    user.generateJsonWebToken();
    const cookieName= user.role==='Admin'?'adminToken':'patientToken'
    res.status(statusCode).cookie(cookieName,token,{
        httpOnly:true,
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000).toJSON({
            success: true,
            message,
            user,
            token
        })
    })
}
export defalut generateToken
```

Now in userController.js make these changes

```javascript
import {catchAsyncErrors} from '../middlewares/catchAsyncErrors.js'
import ErrorHandler from '../middlewares/errorMiddleware.js'
import User from '../models/userSchema.js'
import generateToken from '../utils/jwtToken.js'
export const patientRegister=catchAsyncErrors(async(req,res,next)=>{
   const {  firstName,
            lastName,
            email,
            phone,
            password,
            gender,
            aadhar_number,
            DOB,
            role
        }=req.body

        if( !firstName||
            ! lastName||
            ! email||
            ! phone||
            ! password||
            ! gender||
            ! aadhar_number||
            ! DOB||
            ! role) {
                return next(new ErrorHandler('Please fill the full form!',400));
            } 
            let user=await User.findOne({email,phone});
            if(user){
                return next(new ErrorHandler('User Already Exists!'))
            }
            user=await User.create({
                firstName,
                lastName,
                email,
                phone,
                password,
                gender,
                aadhar_number,
                DOB,
                role
            })
            generateToken(user,"User Registered Successfully!",200,res,)
            // res.status(200).json({
                //     success: true,
                //     message: "User Registered!"
                // })
            });
            
            export const login=catchAsyncErrors(async(req,res,next)=>{
                const {role,email,password,confirmPassword}=req.body;
                if(!role||!email||!password||!confirmPassword){
                    return next(new ErrorHandler("Please fill all the details!"),400);
                }
                let user= await User.findOne({email}).select("+password");
                
                if(!user){
                    return next(new ErrorHandler("Invalid Password or email!"),400);
                }
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Password and Confirm Password don't match!"),400)
    }
    
    if(role!=user.role){
        return next(new ErrorHandler("User Role don't match!"),400)
    }
    
    generateToken(user,"User LoggedIn Successfully!",200,res)
    // res.status(200).json({
    //     success: true,
    //     message:"User LoggedIn Successfully!"
    // })

    
export const addNewAdmin=catchAsyncErrors(async(req,res,next)=>{
    const {  firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        aadhar_number,
        DOB
    }=req.body

    if( !firstName||
        ! lastName||
        ! email||
        ! phone||
        ! password||
        ! gender||
        ! aadhar_number||
        ! DOB) {
            return next(new ErrorHandler('Please fill the full form!',400));
        } 

     const isRegistered=await User.findOne({email});
     if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} already exists!`))
     }   

     const admin=await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        aadhar_number,
        DOB,
        role:'Admin'
     })
     res.status(200).json({
        success: true,
        message: "New Admin Registered!"

     })
});
})
```

and also create a new request named as add new admin in postman user folder
and give the url as `http://localhost:4000/api/v1/user/admin/addnew`

## STEP 13: Create auth.js (Authentication and Authorization)

This file is needed for the admin authentication and authrization so that not other than admin can add a new admin
Path: Backend/middleware/auth.js

```javascript
import { catchAsyncErrors } from './catchAsyncErrors.js';
import ErrorHandler from './errorMiddleware.js';
import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js'
// Admin Authentication and Authorization
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { adminToken: token } = req.cookies;
    
    if (!token) {
        return next(new ErrorHandler("Admin Not Authenticated", 400));
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id); 
    if (req.user.role !== 'Admin') {
        return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403));
    }
    
    next();
});

// Patient Authentication and Authorization
export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { patientToken: token } = req.cookies;
    
    if (!token) {
        return next(new ErrorHandler("Patient Not Authenticated", 400));
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    
    if (req.user.role !== 'Patient') {
        return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403));
    }
    
    next();
});
```

After creating this file import this in userRouter and route it to the request

```javascript
    router.post('/admin/addnew',isAdminAuthenticated,addNewAdmin)
    //This is in userRouter.js
```

## STEP 14: Now create some get methods in userController.js

1. Get all the doctors
2. Add new Doctor
3. Get user details
4. logoutAdmin
5. logoutUser

After doing all the above things now create a post request to add a doctor by admin
and some get request for getting details fo the user,admin and the doctor in the postman in user folder

After all the the complete userController and userRouter files are looking like this

userController.js

```javascript

import {catchAsyncErrors} from '../middlewares/catchAsyncErrors.js'
import ErrorHandler from '../middlewares/errorMiddleware.js'
import User from '../models/userSchema.js'
import generateToken from '../utils/jwtToken.js'
import cloudinary from 'cloudinary'
export const patientRegister=catchAsyncErrors(async(req,res,next)=>{
   const {  firstName,
            lastName,
            email,
            phone,
            password,
            gender,
            aadhar_number,
            DOB,
            role
        }=req.body

        if( !firstName||
            ! lastName||
            ! email||
            ! phone||
            ! password||
            ! gender||
            ! aadhar_number||
            ! DOB||
            ! role) {
                return next(new ErrorHandler('Please fill the full form!',400));
            } 
            let user=await User.findOne({email,phone});
            if(user){
                return next(new ErrorHandler('User Already Exists!'))
            }
            user=await User.create({
                firstName,
                lastName,
                email,
                phone,
                password,
                gender,
                aadhar_number,
                DOB,
                role
            })
            generateToken(user,"User Registered Successfully!",200,res,)
            // res.status(200).json({
                //     success: true,
                //     message: "User Registered!"
                // })
            });
            
            export const login=catchAsyncErrors(async(req,res,next)=>{
                const {role,email,password,confirmPassword}=req.body;
                if(!role||!email||!password||!confirmPassword){
                    return next(new ErrorHandler("Please fill all the details!"),400);
                }
                let user= await User.findOne({email}).select("+password");
                
                if(!user){
                    return next(new ErrorHandler("Invalid Password or email!"),400);
                }
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Password and Confirm Password don't match!"),400)
    }
    
    if(role!=user.role){
        return next(new ErrorHandler("User Role don't match!"),400)
    }
    
    generateToken(user,"User LoggedIn Successfully!",200,res)
    // res.status(200).json({
    //     success: true,
    //     message:"User LoggedIn Successfully!"
    // })
            });
    
export const addNewAdmin=catchAsyncErrors(async(req,res,next)=>{
    const {  firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        aadhar_number,
        DOB
    }=req.body

    if( !firstName||
        ! lastName||
        ! email||
        ! phone||
        ! password||
        ! gender||
        ! aadhar_number||
        ! DOB) {
            return next(new ErrorHandler('Please fill the full form!',400));
        } 

     const isRegistered=await User.findOne({email});
     if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} already exists!`))
     }   

     const admin=await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        aadhar_number,
        DOB,
        role:'Admin'
     })
     res.status(200).json({
        success: true,
        message: "New Admin Registered!"

     })
});

export const addNewDoctor=catchAsyncErrors(async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length===0){
        return next(new ErrorHandler("Doctor Avatar Required!"),400);
    }
    const {docAvatar}=req.files;
    const validFormats=['image/jpeg','image/png','image/webp']
    if(!validFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File Format Not Supported"),400);
    }
    
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        aadhar_number,
        DOB,
        doctorDepartment
    }=req.body;
    
    if(
        !firstName||
        !lastName||
        !email||
        !phone||
        !password||
        !gender||
        !aadhar_number||
        !DOB||
        !doctorDepartment
    ){
        return next(new ErrorHandler("Please Provide full details!"),400);
    }
    
    const isRegistered=await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} already registered with this email!`,400));
    }
    const cloudinaryResponse=await cloudinary.uploader.upload(docAvatar.tempFilePath);
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary Error: ",cloudinaryResponse.error || "Unknown Cloudinary Error");
    }
    const doctor=await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        aadhar_number,
        DOB,
        doctorDepartment,
        role:"Doctor",
        docAvatar:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url
        }
    })
    res.status(200).json({
        success: true,
        message: "New Doctor Registered!",
        doctor
    })
});

export const getAllDoctors=catchAsyncErrors(async(req,res,next)=>{
    const doctors=await User.find({role:"Doctor"})
    res.status(200).json({
        success: true,
        doctors
    });
});

export const getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const users=req.user;
    res.status(200).json({
        success: true,
        users
    });
});

export const logoutAdmin=catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("adminToken","",{
        httpOnly:true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message:"Admin Logged Out Successfully!"
    })
});
export const logoutPatient=catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("patientToken","",{
        httpOnly:true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message:"Patient Logged Out Successfully!"
    })
});

```

userRouter.js

```javascript
import express from 'express'
import { addNewDoctor,addNewAdmin, getAllDoctors,
 getUserDetails, login, logoutAdmin, logoutPatient,
  patientRegister }
from '../controller/userController.js'
import { isAdminAuthenticated,isPatientAuthenticated } from '../middlewares/auth.js'

const router=express.Router()

router.post('/patient/register',patientRegister)
router.post('/login',login)
router.post('/admin/addnew',isAdminAuthenticated,addNewAdmin)
router.post('/doctor/addnew',isAdminAuthenticated,addNewDoctor)
router.get('/doctors',getAllDoctors)
router.get('/admin/me',isAdminAuthenticated,getUserDetails)
router.get('/patient/me',isPatientAuthenticated,getUserDetails)
router.get('/patient/logout',isPatientAuthenticated,logoutPatient)
router.get('/admin/logout',isAdminAuthenticated,logoutAdmin)
export default router
```

`Now one thing is left that we need to show all the messages in the dashboard so we create a method for that in messageController.js`

```javascript
    import {Message} from '../models/messageSchema.js'
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js'
import ErrorHandler from '../middlewares/errorMiddleware.js'

export const sendMessage= catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,message}=req.body;

    if(!firstName ||!lastName||!email||!phone||!message){
        return next(new ErrorHandler('Please fill the Full form!',400))
    }
    await Message.create({firstName,lastName,email,phone,message});
    res.status(200).json({
        success:true,
        message:"Message Send successfully!"
    });
})

export const getAllMessages=catchAsyncErrors(async(req,res,next)=>{
    const messages=await Message.find()
    return res.status(200).json({
        success: true,
        messages
    })
})
```

and messageRouter.js is

```javascript
import express from 'express'
import {isAdminAuthenticated} from '../middlewares/auth.js'
import { getAllMessages, sendMessage } 
from '../controller/messageController.js';
const router=express.Router();

router.post('/send',sendMessage)
router.get('/getMessages',isAdminAuthenticated,getAllMessages)
export default router;
```

## STEP 15: Create a new Model For Appointments

path: Backend/models/appointmentSchema.js

```javascript
import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema=new mongoose.Schema({

    firstName:{
        type: String,
        required:true,
        minLength:[2,"First Name atleast contain 2 characters!"]
    },
    lastName:{
        type: String,
        required:true,
        minLength:[2,"Last Name atleast contain 2 characters!"]
    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail,'Please Provide a valid email!'],
    },
    phone:{
        type:String,
        required: true,
        minLength:[10,"Phone Number Must contain 10 digits!"],
        maxLength:[10,"Phone Number exact contain 10 digits"]
    },
    aadhar_number:{
        type: String,
        required: false,
        minLength:[12,"Aadhar Number Must contain 12 digits!"],
        maxLength:[12,"Aadhar Number exact contain 12 digits"]
    },
    gender:{
        type: String,
        required:true,
        enum:['Male','Female']
    },
    DOB:{
        type: Date,
        required:[true,"Date of Birth is mandatory"]
    },
    appointment_date:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required: true
    },
    doctor:{
        firstName:{
            type: String,
            required: true,
        },
        lastName:{
            type: String,
            required: true,
        }
    },

    hasVisited:{
        type: Boolean,
        default: false
    },
    doctorId:{
        type: mongoose.Schema.ObjectId,
        required: true
    },
    patientId:{
        type: mongoose.Schema.ObjectId,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum:['Pending','Accepted','Rejected'],
        default:'Pending'
    }

}
);

export const Appointment=mongoose.model("Appointment",appointmentSchema);
```

path: Backend/controller/appointmentController.js

```javascript
import {catchAsyncErrors} from '../middlewares/catchAsyncErrors.js'
import ErrorHandler from '../middlewares/errorMiddleware.js'
import {Appointment} from '../models/appointmentSchema.js'
import User from '../models/userSchema.js'

export const postAppointment=catchAsyncErrors(async(req,res,next)=>{
    const {
        firstName,
        lastName,
        email,
        phone,
        aadhar_number,
        gender,
        DOB,
        appointment_date,
        department,
        doctor_firstName,
        doctor_lastName,
        hasVisited,
        address,
    }=req.body;

    if(       
        !firstName||
        !lastName||
        !email||
        !phone||
        !aadhar_number||
        !gender||
        !DOB||
        !appointment_date||
        !department||
        !doctor_firstName||
        !doctor_lastName||
        !address
    ) {
            return next(new ErrorHandler("Please Provide all details!",400));
        }

        const isConflict=await User.find({
            firstName: doctor_firstName,
            lastName:doctor_lastName,
            role:"Doctor",
            doctorDepartment:department
        })
        if(isConflict.length===0){
            return next(new ErrorHandler("Doctor Not Found!",400));
        }1
        if(isConflict.length>1){
            return next(new ErrorHandler("Doctor Conflict! Please Contact through phone or emailId!",400));
        }
        const doctorId=isConflict[0]._id;
        const patientId=req.user._id;

        const appointment=await Appointment.create({
            firstName,
            lastName,
            email,
            phone,
            aadhar_number,
            gender,
            DOB,
            appointment_date,
            department,
            doctor:{
                    firstName:doctor_firstName,
                    lastName:doctor_lastName
                },
            hasVisited,
            address,
            doctorId,
            patientId
        })
        res.status(200).json({
            success: true,
            message:"Appointment Sent Successfully!",
            appointment
        })
});

export const getAllAppointments=catchAsyncErrors(async(req,res,next)=>{
    const appointment=await Appointment.find();
    res.status(200).json({
        success: true,
        appointment
    })
});

export const updateAppointmentStatus=catchAsyncErrors(async(req,res,next)=>{
    const { id }=req.params;
    let appointment=await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment Not Found!",404));
    }
    appointment=await Appointment.findOneAndUpdate({_id:id},req.body,{
        new:true,
        runValidators: true,
        useFindAndModify:false
    });
    res.status(200).json({
        success: true,
        message: "Appointment Status Updated!",
        appointment
    })
})

export const deleteAppointment=catchAsyncErrors(async(req,res,next)=>{
    const { id }=req.params;
    let appointment=await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment Not Found!",404));
    }
    await appointment.deleteOne()

    res.status(200).json({
        success: true,
        message:"Appointment Deleted!"
    })

})
```

path: Backend/router/appointmentRouter.js

```javascript
import express from 'express'
import { postAppointment,getAllAppointments,updateAppointmentStatus,deleteAppointment } from '../controller/appointmentController.js'
import {isPatientAuthenticated,isAdminAuthenticated} from '../middlewares/auth.js'

const router=express.Router()
router.post('/post',isPatientAuthenticated,postAppointment)
router.get('/getAllAppointments',isAdminAuthenticated,getAllAppointments)
router.put('/update_appointment/:id',isAdminAuthenticated,updateAppointmentStatus)
router.delete('/delete_appointment/:id',deleteAppointment)
export default router;
```

### Now Our Backend is Completed
