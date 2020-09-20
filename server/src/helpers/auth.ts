import { Router } from "express"
import { withJWTAuthMiddleware } from "express-kun";
import config from "../config";

export const accessTokenSecret = 'youraccesstokensecret'; // change? also not v sure where to put this

// helper method to create protected router
// used in routes directories (see e.g. in routes/user.ts)
export const createProtectedRouter = (router: Router) => {
    return config.disableAuthentication
        ? router
        : withJWTAuthMiddleware(router, accessTokenSecret);
};