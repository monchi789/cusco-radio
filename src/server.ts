import express from 'express';
import payload from 'payload';
import indexRoutes from "./routes/index.routes";
import path from 'path';
import cors from "cors";
import { fileURLToPath } from 'url';



require('dotenv').config();
const app = express();

// Set EJS as default templane engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set routes
app.use(indexRoutes);

// Set the CSS
app.use(express.static(path.join(__dirname, 'public')))

// Configuration the CORS
const whitelist = ['http://67.207.86.80:3000', 'http://67.207.86.80'];

const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if(whitelist.includes(origin)){
      return callback(null, true)
    }
    
    callback(new Error('Not allowed by CORS'));
  }
}

// Set cors
app.use(cors(corsOptions));

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Add your own express routes here

  app.listen(3000);
}

start();
