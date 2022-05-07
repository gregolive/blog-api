import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cors from 'cors';

import initializePassport from './config/passport.js';
import { authRouterV1, userRouterV1, postRouterV1, commentRouterV1 } from './routes/v1.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// mongoose connection set up
const mongoDB = process.env.MONGODB;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// passport setup
initializePassport(passport);
app.use(passport.initialize());

// define v1 routes
app.use('/api/v1/login', authRouterV1);
app.use('/api/v1/user', userRouterV1);
app.use('/api/v1/post', postRouterV1);
app.use('/api/v1/post/:post_id/comments', commentRouterV1);

export default app;
