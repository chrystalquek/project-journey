import { Router } from "express"
import { withJWTAuthMiddleware } from "express-kun";
import config from "../config";

export const accessTokenSecret = 'youraccesstokensecret'; // TODO

// helper method to create protected router
// used in routes directories (see e.g. in routes/user.ts)
export const createProtectedRouter = (router: Router) => {
    return config.disableAuthentication && config.env != "production" // production must have protected routes
        ? router
        : withJWTAuthMiddleware(router, accessTokenSecret);
};
