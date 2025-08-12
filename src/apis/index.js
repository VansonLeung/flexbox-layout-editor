import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Router } from './router.js';
import { _APIGenericUseRequestResponse } from './_incl/_APIGenericUseRequestResponse.js';

export const initializeAPIs = ({
    models,
}) => 
{
    const app = express();

    // Middleware to parse JSON requests
    app.use(cors());
    app.use(express.static('public'))
    app.use('/uploads', express.static('uploads'));
    app.use(bodyParser.json({limit: '5000mb'}));
    app.use(bodyParser.urlencoded({limit: '5000mb', extended: true}));
    app.use(_APIGenericUseRequestResponse.apply());
    app.use(Router.initialize({ app, models }));

    return app;
}

