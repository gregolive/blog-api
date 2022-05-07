import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';

import initializeMongo from './config/mongoConfig.js';
import initializePassport from './config/passportConfig.js';
import { authRouterV1, userRouterV1, postRouterV1, commentRouterV1 } from './routes/v1.js';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 100000 }));
app.use(cors());

// mongodb/mongoose connection set up
initializeMongo(mongoose);

// passport setup
initializePassport(passport);
app.use(passport.initialize());

// define v1 routes
app.use('/api/v1/login', authRouterV1);
app.use('/api/v1/user', userRouterV1);
app.use('/api/v1/post', postRouterV1);
app.use('/api/v1/post/:post_id/comments', commentRouterV1);

//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

export default app;
