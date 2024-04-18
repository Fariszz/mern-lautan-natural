import express, { Express, Request, Response , Application } from 'express';
const ErrorHandler = require("./middleware/error");

import cors from "cors";
import dotenv from 'dotenv';
const connectDatabase = require('./database/database');

//For env File 
dotenv.config({
  path: 'src/config/.env',
});
// connect database
connectDatabase();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

// import routes
const user = require('./controller/user');
const emailData = require('./controller/emailData');

// use routes
app.use('/api/user', user);
app.use('/api/email', emailData);

// error handler
app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});