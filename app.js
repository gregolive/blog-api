import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

import userRouter from './routes/users.js';
import postRouter from './routes/posts.js';
import commentRouter from './routes/comments.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongoose connection set up
const mongoDB = process.env.MONGODB;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// define routes
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/post/:post_title/comments', commentRouter);

export default app;
