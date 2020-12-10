import express from 'express';
import { body, validationResult } from 'express-validator/check';
import signUpService from '../services/signUp';
import { SIGN_UP_STATUS } from './../models/SignUp';
import { SignUpData, SignUpIdType } from '../types';
import HTTP_CODES from '../constants/httpCodes';
import {stringEnumValidator} from "../helpers/validation";

export type SignUpValidatorMethod = 'createSignUp';

const validate = (method: SignUpValidatorMethod) => {
  switch (method) {
    case 'createSignUp': {
      return [
        body('eventId', 'event id does not exist').exists().isString(),
        body('userId', 'user id does not exist').exists().isString(),
        body('status', 'status does not exist').exists().isString()
            .custom((statusText: string) => stringEnumValidator(SIGN_UP_STATUS, 'Status', statusText)),
        // TODO: add notEmpty() after express-validator version bump
        body('preferences', 'preferences does not exist').exists().isArray(),
        body('isRestricted', 'is restricted does not exist').exists().isBoolean()
      ];
    }
    default: {
      return [];
    }
  }
};

/**
 * Creates a new sign up
 * @param req.body sign up data without the sign_up_id field
 */
const createSignUp = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  // TODO: move to middleware 
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      errors: errors.array(),
    });
    return;
  }

  try {
    const signUpData = await signUpService.createSignUp(req.body);
    res.status(HTTP_CODES.OK).json(signUpData);
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

/**
 * Retrieves a sign up with the specified sign up, event, or volunteer id. 
 * @param req.params.id one of the ids in the sign up
 * @param req.params.idType type of the specified id
 * @return userSignUpDetails the sign up data with the specified id
 */
const readSignUp = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const { id, idType } = req.params;
    const userSignUpDetails = await signUpService.readSignUp(id, idType as SignUpIdType);

    res.status(HTTP_CODES.OK).json(userSignUpDetails);
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

/**
 * Updates an existing sign up
 * @param req.params.id one of the ids in the sign up
 * @param req.params.idType type of the specified id
 * @param req.body the updated sign up data 
 */
const updateSignUp = async (req: express.Request, res: express.Response) => {
  try {
    const { id, idType } = req.params;
    const updatedFields = req.body as SignUpData;

    await signUpService.updateSignUp(id as string, idType as SignUpIdType, updatedFields);

    res.status(HTTP_CODES.OK).send(); 
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

/**
 * Deletes a sign up
 * @param req.params.id one of the ids in the sign up
 * @param req.params.idType type of the specified id
 */
const deleteSignUp = async (req: express.Request, res: express.Response) => {
  try {
    const { id, idType } = req.params;
    await signUpService.deleteSignUp(id, idType as SignUpIdType);
    res.status(HTTP_CODES.OK).send();
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

export default {
  createSignUp,
  readSignUp,
  updateSignUp,
  deleteSignUp,
  validate,
};
