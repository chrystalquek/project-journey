import { Router } from 'express';
import { withJWTAuthMiddleware } from 'express-kun';
import config from '../config';

export const accessTokenSecret = 'youraccesstokensecret'; // TODO: @Akhil can we store this access token secret in Google Secret Manager (https://cloud.google.com/secret-manager)

// helper method to create protected router
// used in routes directories (see e.g. in routes/user.ts)
export const createProtectedRouter = (router: Router) => (config.disableAuthentication && config.env === 'development' // production and staging must have protected routes
  ? router
  : withJWTAuthMiddleware(router, accessTokenSecret));
