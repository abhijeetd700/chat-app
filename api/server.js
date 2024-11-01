import express from 'express'; 
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth.js'
import messsageRoute from './routes/message.js'
import userRoutes from './routes/user.js'
import connectToMongoDB from './db/connectToMongoDB.js';

const envPath = path.resolve(process.cwd(), '.env');
dotenv.config({path: envPath});

const app = express();

const PORT = process.env.PORT || 5000;

const allowedOrigins = ['http://localhost:5173/']; 

app.use(cors({origin: allowedOrigins,credentials:true}));
app.use(cookieParser());
// Use body-parser middleware
app.use(bodyParser.json());  // Parses incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true }));  // Parses URL-encoded data

app.use(express.json())

app.use("/api/auth",authRoute)
app.use("/api/messages",messsageRoute)
app.use("/api/users",userRoutes)

app.get("/api",(req,res)=>{
    res.json("Hello..!")
})

app.listen(PORT,()=>{
    connectToMongoDB()
    console.log("Connected server running on port "+PORT)
})
