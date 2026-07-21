import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import connectDB from './config/db.js';
// import { invokeTextAi } from './services/ai.service.js';
// import { jobDescription, resume, selfDescription } from './services/temp.js';
// import { invokeGemniAi } from './services/ai.service.js';

connectDB();
app.listen(process.env.PORT,()=>{
    console.log("server is running on port 5000");
        
})