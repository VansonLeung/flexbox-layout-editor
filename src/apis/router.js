import express from 'express';
import { _routerWithMeta } from './_incl';
import { APIUserAuth } from './APIUserAuth.js';
import { APIUser } from './APIUser.js';
import { APITemplate } from './APITemplate.js';

export const Router = {
    initialize: ({ app, models }) => {
        const router = express.Router()
        const meta = {}
        const routerWithMeta = _routerWithMeta({ router, meta });

        APIUserAuth.initialize({ app: router, appWithMeta: routerWithMeta, models });
        APIUser.initialize({ app: router, appWithMeta: routerWithMeta, models });
        APITemplate.initialize({ app: router, appWithMeta: routerWithMeta, models });
        
        app.meta = meta;

        return router;
    },
}
